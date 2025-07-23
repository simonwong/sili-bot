import { SidebarTrigger } from '@/components/animate-ui/radix/sidebar';
import { Chat } from '@/features/chat';
import { ModelSelect } from '@/features/model';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/server';

export default async function ChatPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const serverMessages = await api.message.list({ id });

  return (
    <div className={cn('flex h-screen max-h-screen flex-1 flex-col')}>
      <div className="flex items-center gap-2 px-4 py-2">
        <SidebarTrigger />
        <ModelSelect />
      </div>
      <Chat id={id} initialMessages={serverMessages} />
    </div>
  );
}
