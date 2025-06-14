'use client';

import { ModelSelect } from '@/features/model';
import { cn } from '@/lib/utils';

import { Chat } from '@/features/chat';

export default function SiliBotApp() {
  return (
    <div>
      <div className={cn('flex-1 h-screen flex flex-col')}>
        <div className="px-4 py-2">
          <ModelSelect />
        </div>
        <Chat />
      </div>
    </div>
  );
}
