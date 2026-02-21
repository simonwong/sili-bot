import { asc, eq } from 'drizzle-orm';
import type { UIDataTypes, UIMessagePart, UITools } from 'ai';
import { db } from '..';
import { messages } from '../schema';

export const getMessagesByChatId = async ({ chatId }: { chatId: string }) => {
  const messageList = await db
    .select()
    .from(messages)
    .where(eq(messages.chatId, chatId))
    .orderBy(asc(messages.createdAt));
  return {
    messages: messageList,
  };
};

export async function getMessageById({ id }: { id: string }) {
  try {
    const [selectedMessage] = await db
      .select()
      .from(messages)
      .where(eq(messages.id, id));
    return selectedMessage;
  } catch {
    throw new Error('Failed to get message by id');
  }
}

export async function saveMessages(
  messageList: Array<{
    id?: string;
    chatId: string;
    role: string;
    parts: UIMessagePart<UIDataTypes, UITools>[];
  }>
) {
  try {
    const messagesToInsert = messageList.map((message) => ({
      ...message,
      createdAt: new Date(),
    }));
    return await db.insert(messages).values(messagesToInsert);
  } catch (e) {
    throw new Error('Failed to save messages', { cause: e });
  }
}

export async function deleteMessage({ id }: { id: string }) {
  try {
    return await db.delete(messages).where(eq(messages.id, id));
  } catch {
    throw new Error('Failed to delete message');
  }
}
