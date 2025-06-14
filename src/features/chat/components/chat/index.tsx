'use client';

import { ChatInputBar, Messages } from '@/features/chat';
import { cn } from '@/lib/utils';
import { useModelStore } from '@/store';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, UIDataTypes, UIMessage, UIMessagePart } from 'ai';

export interface ChatProps {
  id: string;
  initialMessages?: UIMessage[];
}

export const Chat: React.FC<ChatProps> = ({ id, initialMessages }) => {
  const { messages, sendMessage, status, stop } = useChat({
    id,
    transport: new DefaultChatTransport({
      prepareRequest: ({ id, messages }) => {
        return {
          body: { id, messages, model: useModelStore.getState().model },
        };
      },
    }),
    messages: initialMessages,
  });

  return (
    <div
      className={cn(
        'w-full flex-1 flex flex-col m-auto px-4 overflow-hidden',
        messages.length === 0 && 'justify-center'
      )}
    >
      <Messages messages={messages} chatId={id} status={status} />
      <div className="mb-12">
        <div className="max-w-2xl mx-auto">
          <ChatInputBar
            status={status}
            stop={stop}
            sendMessage={async (data) => {
              const userParts: UIMessagePart<UIDataTypes>[] = [
                ...(data.fileParts ?? []),
                ...(data.textParts ?? []),
              ];
              return sendMessage({
                role: 'user',
                parts: userParts,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
