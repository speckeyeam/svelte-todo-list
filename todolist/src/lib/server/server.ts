import { prisma } from './db'

export const usernames: string[] = (await prisma.user.findMany()).map((user) => user.username)



export async function sessionValid({ sessionId }: { sessionId?: string }) {
    const session= await prisma.sessionId.findUnique({ where: { sessionId } })
    return session.userId;
}
