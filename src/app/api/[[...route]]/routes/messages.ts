import { Hono } from 'hono';
import { getMessagesByChatId } from '@/db/queries/message';

export const messagesRoute = new Hono();

messagesRoute.get('/:chatId', async (c) => {
  const { chatId } = c.req.param();
  const res = await getMessagesByChatId({ chatId });
  return c.json(res);
});