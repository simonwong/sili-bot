import { queryOptions } from '@tanstack/react-query';
import type { ChatMessagesResponse } from '../model/types';

export const chatMessagesQueryKey = (chatId: string) =>
  ['chat', 'messages', chatId] as const;

export async function fetchChatMessages(
  chatId: string
): Promise<ChatMessagesResponse> {
  const response = await fetch(`/api/messages/${encodeURIComponent(chatId)}`);

  if (!response.ok) {
    throw new Error('Failed to fetch chat messages');
  }

  return response.json() as Promise<ChatMessagesResponse>;
}

export const chatMessagesQueryOptions = (chatId: string) =>
  queryOptions({
    queryKey: chatMessagesQueryKey(chatId),
    queryFn: () => fetchChatMessages(chatId),
    enabled: Boolean(chatId) && typeof window !== 'undefined',
  });
