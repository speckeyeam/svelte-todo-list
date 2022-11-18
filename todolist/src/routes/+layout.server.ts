
import type { LayoutServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
   
    
}
/*
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  
export const load: LayoutServerLoad = async ({ cookies }) => {
  const sessionid = cookies.get('sessionid');

  const theUser = await prisma.users.findMany({
    include: {
      sessionid: sessionid,
    },
  })
  return {
    user: await db.getUser(sessionid)
  };
}*/