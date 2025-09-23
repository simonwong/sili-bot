import { Hono } from 'hono';
import { getChatsByUserId } from '@/db/queries';

export const historyRoute = new Hono();

const userId = 'test-user-id';

historyRoute.get('/', async (c) => {
  const res = await getChatsByUserId({ userId });
  return c.json(res);
});
