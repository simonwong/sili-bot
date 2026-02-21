import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Chat } from '@/features/chat';
import { chatMessagesQueryOptions } from '@/features/chat/queries';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/chat/$id')({
  component: ChatPage,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      chatMessagesQueryOptions(params.id)
    );

    return {
      chatId: params.id,
    };
  },
});

function ChatPage() {
  const { chatId } = Route.useLoaderData();
  const { data } = useQuery(chatMessagesQueryOptions(chatId));

  return (
    <div className={cn('flex h-screen max-h-screen flex-1 flex-col')}>
      <div className='flex items-center gap-2 px-4 py-2'>
        <SidebarTrigger />
      </div>
      <Chat id={chatId} initialMessages={data?.messages ?? []} />
    </div>
  );
}
