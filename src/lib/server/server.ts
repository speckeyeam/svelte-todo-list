import { prisma } from './db';

export async function sessionValid(sessionId: string) {
	if (sessionId != null) {
		const session = await prisma.sessionId.findUnique({ where: { sessionId } });

		if (session != null) {
			const userId = session.userId;
			const expiration = session.expiration;

			if (Number(expiration) <= Date.now()) {
				await prisma.sessionId.deleteMany({ where: { sessionId } });
				return null;
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

export async function getTask(id: number, sessionId: string) {
	const userId = await sessionValid(sessionId);
	if (userId) {
		const task = await prisma.todo.findUnique({ where: { id } });
		if (task?.userId == userId) {
			return task;
		} else {
			return null;
		}
	}
}

export async function getProjects(sessionId: string) {
	const userId = await sessionValid(sessionId);
	if (userId) {
		const task = await prisma.project.findMany({ where: { userId } });
		return task;
	}
}

export async function getTask2(id: number, sessionId: string) {
	const userId = await sessionValid(sessionId);
	if (userId) {
		const task = await prisma.Task.findUnique({ where: { id } });
		if (task?.userId == userId) {
			return task;
		} else {
			return null;
		}
	}
}
