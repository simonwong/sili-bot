import { createFileRoute } from '@tanstack/react-router';
import { getChatsByUserId } from '@/db/queries';

const userId = 'test-user-id';

export const Route = createFileRoute('/api/history')({
  server: {
    handlers: {
      GET: async () => {
        const res = await getChatsByUserId({ userId });
        console.log('res', res);
        return Response.json(res);
      },
    },
  },
});
