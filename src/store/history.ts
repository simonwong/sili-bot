import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface HistoryData {
  chats: Array<{ id: string; title: string }>;
}

export const useQueryHistory = () => {
  return useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const response = await fetch('/api/history');
      const res = await response.json();
      return res;
    },
  });
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await fetch(`/api/history/${id}`, {
        method: 'DELETE',
      });
    },
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['history'] });

      const previousHistory = queryClient.getQueryData<HistoryData>([
        'history',
      ]);

      queryClient.setQueryData<HistoryData>(['history'], (old) => {
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
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
};
