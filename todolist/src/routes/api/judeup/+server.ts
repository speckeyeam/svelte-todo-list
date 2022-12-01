import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ cookies, request }) => {
	const data = await request.json();

	const sessionId = cookies.get('sessionid');

	if (sessionId != undefined) {
		const session = await prisma.sessionId.findFirst({ where: { sessionId } });
		const userid = session?.userId;
		if (userid != null) {
			return json({ LoggedIn: true });
		}
	}

	const signupSchema = z.object({
		username: z.string().min(1).max(50),
		email: z.string().email(),
		password: z.string().min(1).max(50)
	});

	const { username, email, password } = signupSchema.parse({
		username: data.username,
		email: data.email,
		password: data.password
	});

	const result = await prisma.user.findFirst({ where: { email } });

	if (result != null) {
		return json({ emailedUsed: true });
	}

	const result2 = await prisma.user.findFirst({ where: { username } });

	if (result2 != null) {
		return json({ usernameUsed: true });
	}

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	const user = await prisma.user.create({
		data: {
			email,
			password: hash,
			username
		}
	});

	const session = await prisma.sessionId.create({
		data: {
			userId: user.id,
			expiration: String(Date.now() + 43800 * 60000)
		}
	});

	const userid: string = user.id;
	cookies.set('sessionid', session.sessionId, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
		sameSite: true,
		httpOnly: true
	});

	//should prob check other stuff just in case
	return json({ sucess: true });
	//return json(newList.value + " test");
};
