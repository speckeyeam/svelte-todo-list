import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sessionValid, getTask } from '$server/server';

import { PrismaClient } from '@prisma/client';
import Task from '$components/task.svelte';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ cookies, request }) => {
	const list = await request.json();

	let valid;
	const sessionId = cookies.get('sessionid') as string;

	if (list.update) {
		if (sessionId != null) {
			valid = await sessionValid(sessionId);
		} else {
			return json({ sucess: false });
		}
		const validtask = await getTask(list.id, sessionId);

		if (valid && validtask) {
			console.log('test');
			const userId = String(valid);
			const updatelist = await prisma.todo.update({
				where: { id: list.id },
				data: { task: list.task }
			});

			if (!updatelist) {
				return json({ sucess: false });
			}
		} else {
			return json({ sucess: false });
		}
		return json({ sucess: true });

		//return json(newList.value + " test");
	} else {
		if (sessionId != null) {
			valid = await sessionValid(sessionId);
		}

		if (valid) {
			const userId = String(valid);
			const updatelist = await prisma.todo.delete({
				where: { id: list.id }
			});
			if (!updatelist) {
				return json({ sucess: false });
			}
		} else {
			return json({ sucess: false });
		}
		return json({ sucess: true });
	}
};
