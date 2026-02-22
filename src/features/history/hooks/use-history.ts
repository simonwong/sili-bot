import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import {
  deleteHistoryChat,
  fetchHistory,
  historyQueryKey,
} from '../api';
import type { HistoryResponse } from '../model/types';

export const useHistoryQuery = (): UseQueryResult<HistoryResponse> =>
  useQuery({
    queryKey: historyQueryKey,
    queryFn: fetchHistory,
    enabled: typeof window !== 'undefined',
  });

export const useDeleteHistoryChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await deleteHistoryChat(id);
    },
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: historyQueryKey });

      const previousHistory = queryClient.getQueryData<HistoryResponse>(
        historyQueryKey
      );

      queryClient.setQueryData<HistoryResponse>(historyQueryKey, (old) => {
        if (!old) {
          return old;
        }

        return {
          ...old,
          chats: old.chats.filter((chat) => chat.id !== id),
        };
      });

      return { previousHistory };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousHistory) {
        queryClient.setQueryData(historyQueryKey, context.previousHistory);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: historyQueryKey });
    },
  });
};
