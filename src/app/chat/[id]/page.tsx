'use client';

import { ModelSelect } from '@/features/model';
import { cn } from '@/lib/utils';

import { Chat } from '@/features/chat';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useParams } from 'next/navigation';

export default function ChatPage() {
  const { id } = useParams();
  console.log(id);

  return (
    <div className={cn('flex-1 h-screen flex flex-col')}>
      <div className="px-4 py-2 flex items-center gap-2">
        <SidebarTrigger />
        <ModelSelect />
      </div>
      <Chat />
    </div>
  );
}
