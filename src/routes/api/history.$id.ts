import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { deleteChatById } from '@/db/queries';

const userId = 'test-user-id';

export const Route = createFileRoute('/api/history/$id')({
  server: {
    handlers: {
      DELETE: async ({ params }) => {
        await deleteChatById({ id: params.id });
        return json({ message: 'Chat deleted' });
      },
    },
  },
});
