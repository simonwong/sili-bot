import { eq } from 'drizzle-orm';
import { db } from '..';
import { chat } from '../schema';

export const getChatsByUserId = async ({ userId }: { userId: string }) => {
  const chats = await db.select().from(chat).where(eq(chat.userId, userId));
  return {
    chats,
  };
};

export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    return selectedChat;
  } catch (error) {
    console.error('error', error);
    throw new Error('Failed to get chat by id');
  }
}

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  try {
    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      userId,
      title,
    });
  } catch (error) {
    console.error('error', error);
    throw new Error('Failed to save chat');
  }
}
