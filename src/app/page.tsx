import { SidebarTrigger } from '@/components/animate-ui/radix/sidebar';
import { Chat } from '@/features/chat';
import { ModelSelect } from '@/features/model';
import { cn, generateUUID } from '@/lib/utils';

export default function SiliBotApp() {
  const chatId = generateUUID();

  return (
    <div className={cn('flex h-screen max-h-screen flex-1 flex-col')}>
      <div className="flex items-center gap-2 px-4 py-2">
        <SidebarTrigger />
        <ModelSelect />
      </div>
      <Chat id={chatId} />
    </div>
  );
}
