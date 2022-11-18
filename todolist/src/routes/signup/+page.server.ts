import type { PageServerLoad, Actions } from './$types';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		let password = data.get('password');
		let email = data.get('email');
		let username = data.get('username');

		const prisma = new PrismaClient();

		const result = await prisma.users.findFirst({ where: { email: email } });

		if (result == null) {
			if (typeof password != null) {
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);
        
        const user = await prisma.users.create({
          data: {
           email: email,
           password: hash,
           username: username
          }
        });
        console.log("WHAT DO I DO WITH THIS COOPER" + user.id)
			}


		}
	}
};
