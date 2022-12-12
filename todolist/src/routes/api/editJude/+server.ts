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
	console.log(list);
	if (list.method) {
		if (list.method == 'update') {
			if (sessionId != null) {
				valid = await sessionValid(sessionId);
			}
			let validtask = await getTask(list.id, sessionId);

			if (valid) {
				const userId = String(valid);
				const updatelist = await prisma.todo.update({
					where: { id: list.id },
					data: { task: list.task }
				});
				if (!updatelist) {
					return json({ sucess: false });
				}
			} else {
				return json({ notLoggedIn: true });
			}
		} else {
			if (sessionId != null) {
				valid = await sessionValid(sessionId);
			}
			let validtask = await getTask(list.id, sessionId);

			if (valid) {
				const userId = String(valid);
				const updatelist = await prisma.todo.delete({
					where: { id: list.id }
				});
				if (!updatelist) {
					return json({ sucess: false });
				}
			} else {
				return json({ notLoggedIn: true });
			}
		}
	} else {
		return json({ sucess: false });
	}
	return json({ sucess: true });

	//return json(newList.value + " test");
};
