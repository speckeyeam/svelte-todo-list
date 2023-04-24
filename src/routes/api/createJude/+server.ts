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

	if (valid != undefined) {
		if (valid != null) {
			const userid = String(valid);
			const list = await prisma.todo.create({
				data: {
					userId: userid,
					task: newList.value
				}
			});
		} else {
			return json({ notLoggedIn: true });
		}
	} else {
		return json({ notLoggedIn: true });
	}

	return json({ sucess: true });

	//return json(newList.value + " test");
};
