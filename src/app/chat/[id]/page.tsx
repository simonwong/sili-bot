import { ModelSelect } from '@/features/model';
import { cn } from '@/lib/utils';

import { Chat } from '@/features/chat';
import { SidebarTrigger } from '@/components/animate-ui/radix/sidebar';
import { api } from '@/trpc/server';

export default async function ChatPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const serverMessages = await api.message.list({ id });

  return (
    <div className={cn('flex-1 h-screen max-h-screen flex flex-col')}>
      <div className="px-4 py-2 flex items-center gap-2">
        <SidebarTrigger />
        <ModelSelect />
      </div>
      <Chat initialMessages={serverMessages} id={id} />
    </div>
  );
}
