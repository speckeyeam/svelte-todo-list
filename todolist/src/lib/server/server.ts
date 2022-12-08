import { prisma } from './db';

export async function sessionValid(sessionId: string) {
	if (sessionId != null) {
		const session = await prisma.sessionId.findUnique({ where: { sessionId } });

		if (session != null) {
			const userId = session.userId;
			const expiration = session.expiration;

			if (Number(expiration) <= Date.now()) {
				await prisma.sessionId.deleteMany({ where: { sessionId } });
				return false;
			} else {
				return userId;
			}
		} else {
			return null;
		}
	} else {
		return null;
	}
}

export async function getTask(id: number, userid: string) {
	const task = await prisma.todo.findUnique({ where: { id } });

	if (task != null) {
		if (task.userId == userid) {
			return task;
		} else {
			return null;
		}
	} else {
		return null;
	}
}
