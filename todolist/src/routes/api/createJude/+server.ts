import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
 
export const POST: RequestHandler = async ({ request }) => {
  const { a, b } = await request.json();

  console.log( JSON.parse((a + b)))
  return json(a + b);

}