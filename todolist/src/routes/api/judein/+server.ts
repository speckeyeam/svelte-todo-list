import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ cookies, request }) => {
	const data = await request.json();

	const sessionId = cookies.get('sessionid');
	console.log(sessionId);
	if (sessionId != undefined) {
		const session = await prisma.sessionId.findFirst({ where: { sessionId } });
		const userid = session?.userId;
		if (userid != null) {
			return json({ LoggedIn: true });
		}
	}

	const loginSchema = z.object({
		email: z.string().email(),
		password: z.string().min(1).max(50)
	});

	const { email, password } = loginSchema.parse({
		email: data.email,
		password: data.password
	});

	const user = await prisma.user.findFirst({
		where: {
			email
		}
	});

	if (user != null) {
		bcrypt.compare(password, user.password, function (err, res) {
			if (err) {
				return json({ error: true });
			}
			if (res) {
			} else {
				// response is OutgoingMessage object that server response http request
				return json({ success: false, message: 'passwords do not match' });
			}
		});
	} else {
		return json({ EmailDoesNotExist: true });
	}
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
