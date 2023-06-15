import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProject, sessionValid } from '$server/server';

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
				const project = await getProject(projectId, sessionId);
				if (project!= null) {
					return {
						title: project.title,
						id: project.id
					};
				}
			}
		}
	}

	throw error(404, 'Not found');
})satisfies PageServerLoad;
