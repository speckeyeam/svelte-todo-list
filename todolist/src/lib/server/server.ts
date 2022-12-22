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

export async function getTask(id: number, userId: string) {
	const task = await prisma.todo.findUnique({ where: { id } });
	if (task?.userId == userId) {
		return task;
	} else {
		return null;
	}
}
