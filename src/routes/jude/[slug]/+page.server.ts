import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getTasks, sessionValid } from '$server/server';

export const load = ( async ({params, cookies}) => {

	const sessionId = cookies.get('sessionid');


	if (sessionId) {
		
			const projectId: number = +params.slug;
			if (projectId != null) {
				const tasks = await getTasks(projectId, sessionId);
				if (tasks != null) {
					return {
						data: tasks
					};
				}
			}
		
	}


	//throw error(404, 'Not found');
})satisfies PageServerLoad;
