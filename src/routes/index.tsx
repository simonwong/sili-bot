import { createFileRoute } from '@tanstack/react-router';
import { useRef } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Chat } from '@/features/chat';
import { cn, generateUUID } from '@/lib/utils';

export const Route = createFileRoute('/')({
  component: SiliBotApp,
});

function SiliBotApp() {
  const chatIdRef = useRef(generateUUID());
  const chatId = chatIdRef.current;

  return (
    <div className={cn('flex h-screen max-h-screen flex-1 flex-col')}>
      <div className='flex items-center gap-2 px-4 py-2'>
        <SidebarTrigger />
      </div>
      <Chat id={chatId} />
    </div>
  );
}
