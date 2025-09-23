import { useQuery } from '@tanstack/react-query';

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
