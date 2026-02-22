'use client';

import type { ChatStatus, UIMessage } from 'ai';
import type React from 'react';
import { useEffect, useState } from 'react';
import {
  Conversation,
  ConversationContent,
} from '@/components/ai-elements/conversation';
import { Greeting } from './greeting';
import { Message } from './message';
import { ThinkingMessage } from './thinking-message';

export interface MessagesProps {
  chatId: string;
  messages: UIMessage[];
  status: ChatStatus;
}

export const Messages: React.FC<MessagesProps> = ({
  messages,
  chatId,
  status,
}) => {
  const [hasSentMessage, setHasSentMessage] = useState(false);

  useEffect(() => {
    if (chatId) {
      setHasSentMessage(false);
    }
  }, [chatId]);

  useEffect(() => {
    if (status === 'submitted') {
      setHasSentMessage(true);
    }
  }, [status]);

  if (messages.length === 0) {
    return (
      <div className='relative flex flex-col gap-6 px-4'>
        <Greeting />
      </div>
    );
  }

  return (
    <Conversation>
      <ConversationContent className='gap-0 px-4'>
        <div>
          {messages.map((message, index) => (
            <Message
              isLastMessage={index === messages.length - 1}
              key={message.id}
              message={message}
              requiresScrollPadding={
                hasSentMessage && index === messages.length - 1
              }
              status={status}
            />
          ))}
        </div>
        {status === 'submitted' && messages.at(-1)?.role === 'user' && (
          <ThinkingMessage />
        )}
      </ConversationContent>
    </Conversation>
  );
};
