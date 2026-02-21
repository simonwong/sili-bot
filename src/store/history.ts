import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type HistoryData = {
  chats: Array<{ id: string; title: string }>;
};

export const useQueryHistory = () =>
  useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      console.log('111', 111);
      const response = await fetch('/api/history');
      console.log('222', 222);
      const res = await response.json();
      console.log('333', 222);
      console.log('res', res);
      return res;
    },
  });

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
