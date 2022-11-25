import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const POST: RequestHandler = async ({ cookies, request }) => {
	const newList = await request.json();
	
		const userid= cookies.get('userid');
	
		if (userid !== undefined){
			if (userid != "jude"){
				const list = await prisma.todo.create({
					data: {
						userId: userid,
						task: newList.value
					}
				});
				return json({sucess: true})
				
			}
			else{
				return json({notLoggedIn: true})
			}
		}
		else{
			console.log("test")
			return json({notLoggedIn: true})
		}
		
	

	

	//return json(newList.value + " test");
};
