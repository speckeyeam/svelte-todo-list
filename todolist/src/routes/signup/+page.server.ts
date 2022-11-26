import type { PageServerLoad, Actions } from './$types';
import { PrismaClient } from '@prisma/client';
//import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { json } from '@sveltejs/kit';
import { z } from 'zod';

const prisma = new PrismaClient();
const salt = 'jude';
const signupSchema = z.object({
	username: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(1)
});
export const actions: Actions = {
	default: async ({ cookies, request }) => {


		const data = await request.formData();
		const { username, email, password } = signupSchema.parse({
			username: data.get('username'),
			email: data.get('email'),
			password: data.get('password')
		});

		const result = await prisma.user.findFirst({ where: { email } });

		if (result != null) {
			return false;
		}

		const result2 = await prisma.user.findFirst({ where: { username } });

		if (result2 != null) {
			return false;
		}
		//f6952d6eef555ddd87aca66e56b91530222d6e318414816f3ba7cf5bf694bf0f
		const hash = crypto
			.createHash('sha256')
			.update(password + salt)
			.digest('hex');
		//console.log(hash);
		//const salt = bcrypt.genSaltSync(10);
		//const hash = bcrypt.hashSync(password, salt);

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
				expiration: String(Date.now() + (43800 *60000))
			}
		});

		const userid: string = user.id
		cookies.set('sessionid', session.sessionId, {
		  path: '/',
		  maxAge: 60 * 60 * 24 * 365,
		  sameSite: true,
		  httpOnly: true
		})

		let test = cookies.get('userid');
		console.log(test)
		return user.id;
		/*bcrypt.compare(
			'penis',
			'$2a$10$.668j626UbC5zu6l.qlk2O3hS.9bqOsswRMPDpVcYO5yLXY7byBua',
			function (err, result) {
				console.log('matches');
			}
		);*/

		//console.log('WHAT DO I DO WITH THIS COOPER' + user.id);
	}
};
