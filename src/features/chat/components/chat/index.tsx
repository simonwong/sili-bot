'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { ChatInputBar, Messages } from '@/features/chat';
import { cn, generateUUID } from '@/lib/utils';
import { useModelStore } from '@/store';

export interface ChatProps {
  id: string;
  initialMessages?: UIMessage[];
}

export const Chat: React.FC<ChatProps> = ({ id, initialMessages }) => {
  const { messages, sendMessage, status, stop } = useChat({
    id,
    generateId: generateUUID,
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest: (options) => {
        return {
          api: '/api/chat',
          body: {
            messages: options.messages,
            id,
            model: useModelStore.getState().model,
          },
        };
      },
    }),
    messages: initialMessages,
  });

  return (
    <div
      className={cn(
        'm-auto flex w-full flex-1 flex-col overflow-hidden px-4',
        messages.length === 0 && 'justify-center'
      )}
    >
      <Messages chatId={id} messages={messages} status={status} />
      <div className="mb-12">
        <div className="mx-auto max-w-2xl">
          <ChatInputBar
            chatId={id}
            sendMessage={(data) => {
              const userParts: UIMessage['parts'] = [
                ...(data.fileParts ?? []),
                ...(data.textParts ?? []),
              ];
              return sendMessage({
                role: 'user',
                parts: userParts,
              });
            }}
            status={status}
            stop={stop}
          />
        </div>
      </div>
    </div>
  );
};
