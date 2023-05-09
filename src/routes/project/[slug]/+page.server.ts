import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getTasks, sessionValid } from '$server/server';

export const load = ( async ({params, cookies}) => {
	let valid;
	const sessionId = cookies.get('sessionid');
	if (sessionId != null) {
		valid = await sessionValid(sessionId);
	}

	if (valid != undefined) {
		if (valid != null) {
			const userid = String(valid);
			const projectId: number = +params.slug;
			if (projectId != null) {
				const task = await getTasks(projectId, userid);
				if (task != null) {
					return {
						title: task.task,
						id: 23
					};
				}
			}
		}
	}

	throw error(404, 'Not found');
})satisfies PageServerLoad;
