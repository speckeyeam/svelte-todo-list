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

export async function getProject(id: number, sessionId: string) {
	const userId = await sessionValid(sessionId);

	if (userId) {
		const valid = await prisma.UsersProjects.findFirst({
			where: { userId: userId, projectId: id }
		});
		if (valid) {
			const project = await prisma.project.findUnique({ where: { id } });
			return project;
		} else {
			return null;
		}
	}
}

export async function getTasks(projectId: number, sessionId: string) {
	const project = await getProject(projectId, sessionId);

	if (project) {
		const tasks = await prisma.task.findMany({ where: { projectId } });
		return { tasks, id: project.id, title: project.title };
	} else {
		return null;
	}
}
