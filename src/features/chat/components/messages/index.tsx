'use client';

import type { ChatStatus, UIMessage } from 'ai';
import { motion } from 'motion/react';
import type React from 'react';
import { cn } from '@/lib/utils';
import { useMessages } from '../../hooks/use-messages';
import { Greeting } from './greeting';
import { Message } from './message';
import { ThinkingMessage } from './thinking-message';

export interface MessagesProps {
  messages: UIMessage[];
  chatId: string;
  status: ChatStatus;
}

export const Messages: React.FC<MessagesProps> = ({
  messages,
  chatId,
  status,
}) => {
  const {
    containerRef: messagesContainerRef,
    endRef: messagesEndRef,
    onViewportEnter,
    onViewportLeave,
    hasSentMessage,
  } = useMessages({
    chatId,
    status,
  });
  return (
    <div
      className={cn(
        'relative flex flex-col gap-6 overflow-y-scroll',
        messages.length > 0 && 'flex-1'
      )}
      ref={messagesContainerRef}
    >
      {messages.length === 0 && <Greeting />}
      {messages.length > 0 && (
        <div>
          {messages.map((message, index) => {
            return (
              <Message
                key={message.id}
                message={message}
                requiresScrollPadding={
                  hasSentMessage && index === messages.length - 1
                }
              />
            );
          })}
        </div>
      )}

      {status === 'submitted' &&
        messages.length > 0 &&
        messages.at(-1)?.role === 'user' && <ThinkingMessage />}

      <motion.div
        className="min-h-[24px] min-w-[24px] shrink-0"
        onViewportEnter={onViewportEnter}
        onViewportLeave={onViewportLeave}
        ref={messagesEndRef}
      />
    </div>
  );
};
