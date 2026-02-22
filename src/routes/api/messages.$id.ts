import { createFileRoute } from '@tanstack/react-router';
import { getMessagesByChatId } from '@/db/queries/message';

export const Route = createFileRoute('/api/messages/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const res = await getMessagesByChatId({ chatId: params.id });
        return Response.json(res);
      },
    },
  },
});
