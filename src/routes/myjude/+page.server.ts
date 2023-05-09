import type { PageServerLoad } from './$types';
import { sessionValid } from '$server/server';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
//https://svelte.dev/tutorial/custom-stores use stores to make it less ED
export const prerender = false;
// load data from the database based on the request
export const load = ( async ({cookies}) => {

	try {
		console.log('ran');
		const sessionId = cookies.get('sessionid') as string;

		const valid = await sessionValid(sessionId);
		if (valid) {
			const userId = valid;
			const user = await prisma.user.findUnique({
				where: { id: userId },
				include: { todos: true}
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
})satisfies PageLoad;
