import { ModelSelect } from '@/features/model';
import { cn, generateUUID } from '@/lib/utils';

import { Chat } from '@/features/chat';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function SiliBotApp() {
  const chatId = generateUUID();

  return (
    <div className={cn('flex-1 h-screen flex flex-col')}>
      <div className="px-4 py-2 flex items-center gap-2">
        <SidebarTrigger />
        <ModelSelect />
      </div>
      <Chat id={chatId} />
    </div>
  );
}
