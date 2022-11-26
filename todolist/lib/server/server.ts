import { prisma } from './db'

export const usernames: string[] = (await prisma.user.findMany()).map((user) => user.username)



export async function sessionValid({ sessionId }: { sessionId?: string }) {
    return (await prisma.sessionId.findUnique({ where: { sessionId } })) !== null
}
