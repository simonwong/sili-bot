import { Hono } from 'hono';
import { deleteChatById, getChatsByUserId } from '@/db/queries';

export const historyRoute = new Hono();

const userId = 'test-user-id';

historyRoute.get('/', async (c) => {
  const res = await getChatsByUserId({ userId });
  return c.json(res);
});

historyRoute.delete('/:id', async (c) => {
  const { id } = await c.req.param();
  await deleteChatById({ id });
  return c.json({ message: 'Chat deleted' });
});
