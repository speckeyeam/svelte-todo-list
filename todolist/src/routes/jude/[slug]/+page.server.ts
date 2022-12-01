import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getTask, sessionValid } from '$server/server';

export const load: PageServerLoad = async ({ params, cookies }) => {
	let valid;
	const sessionId = cookies.get('sessionid');
	if (sessionId != null) {
		valid = await sessionValid(sessionId);
	}

	if (valid != undefined) {
		if (valid != null) {
			const userid = String(valid);
			const postid: number = +params.slug;
			if (postid != null) {
				const task = await getTask(postid, userid);
				if (task != null) {
					return {
						title: task.task,
						id: task.id
					};
				}
			}
		}
	}

	throw error(404, 'Not found');
};
