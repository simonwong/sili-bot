import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { useModelStore } from '@/features/model';
import { cn, generateUUID } from '@/lib/utils';
import { ChatInputBar } from '../chat-input-bar';
import { Messages } from '../messages';

export interface ChatProps {
  id: string;
  initialMessages?: UIMessage[];
}

export const Chat: React.FC<ChatProps> = ({ id, initialMessages }) => {
  const { messages, sendMessage, status, stop } = useChat({
    id,
    generateId: generateUUID,
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest: (options) => ({
        api: '/api/chat',
        body: {
          messages: options.messages,
          id,
          model: useModelStore.getState().chatModel,
        },
      }),
    }),
    messages: initialMessages,
  });

  return (
    <div
      className={cn(
        'm-auto flex w-full flex-1 flex-col overflow-hidden',
        messages.length === 0 && 'justify-center'
      )}
    >
      <Messages chatId={id} messages={messages} status={status} />
      <div className='mb-12'>
        <div className='mx-auto max-w-2xl'>
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
