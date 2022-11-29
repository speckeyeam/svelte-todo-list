import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ cookies, request }) => {
	const newList = await request.json();

	const sessionId = cookies.get('sessionid');

	if (sessionId !== undefined || sessionId != 'jude') {
		const session = await prisma.sessionId.findFirst({ where: { sessionId } });
		const userid = session?.userId;
		if (userid == null) {
			return json({ notLoggedIn: true });
		}
	} else {
		return json({ notLoggedIn: true });
	}

	return json({ sucess: true });

	//return json(newList.value + " test");
};
