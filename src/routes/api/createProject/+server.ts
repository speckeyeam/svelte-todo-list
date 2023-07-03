import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sessionValid } from '$server/server';

import { PrismaClient } from '@prisma/client';
import { invalidate } from '$app/navigation';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ cookies, request }) => {
	const newList = await request.json();
	let valid;
	const sessionId = cookies.get('sessionid');
	if (sessionId != null) {
		valid = await sessionValid(sessionId);
	}

	if (valid) {
		const userid = String(valid);

		const project = await prisma.project.create({
			data: {
				title: newList.value,
				User: {
					connect: {
						id: userid
					}
				}
			}
		});

		if (!project) {
			return json({ sucess: false });
		}

		const projectUser = await prisma.UsersProjects.create({
			data: {
				projectId: project.id,
				userId: userid
			}
		});
		if (!projectUser) {
			return json({ sucess: false });
		}
	} else {
		return json({ notLoggedIn: true });
	}

	return json({ sucess: true });

	//return json(newList.value + " test");
};
