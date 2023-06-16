import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getTasks, sessionValid } from '$server/server';

export const load = ( async ({params, cookies}) => {
	let valid;
	const sessionId = cookies.get('sessionid');

			const userid = String(valid);
			const projectId: number = +params.slug;
			if (projectId) {
				const tasks = await getTasks(projectId, sessionId);
				if (tasks) {
					return {
						title: tasks.title,
						id: tasks.id,
						tasks: tasks
					};
				}

			}
	throw error(404, 'Not found');
})satisfies PageServerLoad;
