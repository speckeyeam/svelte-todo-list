import type { PageLoad } from './$types';
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
			//instead, loop through usersProjects, and have that 

			const projects = await prisma.UsersProjects.findMany({
				where: { userId: userId },
			});

			const data: any = [];
			for (const projectIt of projects) {

				// Perform asynchronous operations with 'project'
				const project = await prisma.project.findUnique({
					where: { id: projectIt.projectId },
				});
				if (project){
					data.push(project);
				}
				
			  }
			  return {
				data: data

			};
		} else {
			throw error(403, 'FORBIDDEN');
		}
	} catch (e) {
		console.log(e);
		throw error(403, 'FORBIDDEN');
	}
})satisfies PageLoad;
