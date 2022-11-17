import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { PrismaClient } from '@prisma/client';

export const POST: RequestHandler = async ({ request }) => {
	const newList = await request.json();

	const prisma = new PrismaClient();

	async function main() {
		const list = await prisma.todo.create({
			data: {
				list: newList.value
			}
		});
		console.log(list);
	}

	main()
		.then(async () => {
			await prisma.$disconnect();
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	console.log(newList.value);
	return json(newList);
};
