import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sessionValid, getTask } from '$server/server';
    import { isLoggedIn } from '$stores/stores';
import { PrismaClient } from '@prisma/client';
import Task from '$components/task.svelte';
import { sortUserPlugins } from 'vite';

const prisma = new PrismaClient();

export const POST = (async ({ cookies, request }) => {
	const list = await request.json();

	const sessionId = cookies.get('sessionid') as string;

	const valid = await sessionValid(sessionId);
	if (valid) {
		const userId = valid;
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { todos: true }
		});
		if (user != null) {
			return json({ data: user.todos });
		}
	}
	return json({ error: true });
}) satisfies RequestHandler;
