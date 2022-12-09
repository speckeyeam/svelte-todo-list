import type { PageServerLoad } from './$types';
import { sessionValid } from '$server/server';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const prerender = false;
// load data from the database based on the request
export const load: PageServerLoad = async ({ request, cookies }) => {
	try {
		const sessionId = String(cookies.get('sessionid'));

		const valid = await sessionValid(sessionId);
		if (valid != false && valid != null) {
			const userId = valid;
			const user = await prisma.user.findUnique({
				where: { id: userId },
				include: { todos: true }
			});
			if (user != null) {
				return {
					data: user.todos
				};
			} else {
				throw error(403, 'FORBIDDEN');
			}
		} else {
			throw error(403, 'FORBIDDEN');
		}
	} catch (e) {
		console.log(e);
		throw error(403, 'FORBIDDEN');
	}
};
