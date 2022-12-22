import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sessionValid, getTask } from '$server/server';

import { PrismaClient } from '@prisma/client';
import Task from '$components/task.svelte';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ cookies, request }) => {
	const list = await request.json();

	let valid;
	let validtask;
	const sessionId = cookies.get('sessionid') as string;
	if (sessionId != null) {
		valid = await sessionValid(sessionId);
	}

	console.log(validtask);
	if (valid) {
		const userId = String(valid);
		validtask = await getTask(list.id, userId);
		if (validtask) {
			const updatelist = await prisma.todo.update({
				where: { id: list.id },
				data: { task: list.task }
			});
			if (!updatelist) {
				return json({ sucess: false });
			}
		} else {
			return json({ invalid: true });
		}
	} else {
		return json({ notLoggedIn: true });
	}

	return json({ sucess: true });

	//return json(newList.value + " test");
};
