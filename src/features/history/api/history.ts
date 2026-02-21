import type { HistoryResponse } from '../model/types';

export const historyQueryKey = ['history'] as const;

export async function fetchHistory(): Promise<HistoryResponse> {
  const response = await fetch('/api/history');

  if (!response.ok) {
    throw new Error('Failed to fetch chat history');
  }

  return response.json() as Promise<HistoryResponse>;
}

export async function deleteHistoryChat(id: string): Promise<void> {
  const response = await fetch(`/api/history/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete chat');
  }
}
