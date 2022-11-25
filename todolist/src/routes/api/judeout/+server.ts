import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const POST: RequestHandler = async ({ cookies, request }) => {
	const newList = await request.json();

		const userid= cookies.get('userid');
		if (userid !== undefined){
			if (userid != "jude"){

                cookies.set('userid', "jude", {
                    path: '/',
                    maxAge: 0,
                    sameSite: true,
                    httpOnly: true
                  })
				
			}
		}
		
	return json("okay");

	

	//return json(newList.value + " test");
};
