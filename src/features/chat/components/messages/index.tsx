'use client';

import React from 'react';
import { Greeting } from './greeting';
import { ChatStatus, UIMessage } from 'ai';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Message } from './message';
import { useMessages } from '../../hooks/use-messages';
import { ThinkingMessage } from './thinking-message';

export interface MessagesProps {
  messages: UIMessage[];
  chatId: string;
  status: ChatStatus;
}

export const Messages: React.FC<MessagesProps> = ({ messages, chatId, status }) => {
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
      ref={messagesContainerRef}
      className={cn(
        'flex flex-col gap-6 overflow-y-scroll relative',
        messages.length > 0 && 'flex-1'
      )}
    >
      {messages.length === 0 && <Greeting />}
      {messages.length > 0 && (
        <div>
          {messages.map((message, index) => {
            return (
              <Message
                key={message.id}
                message={message}
                requiresScrollPadding={hasSentMessage && index === messages.length - 1}
              />
            );
          })}
        </div>
      )}

      {status === 'submitted' &&
        messages.length > 0 &&
        messages[messages.length - 1].role === 'user' && <ThinkingMessage />}

      <motion.div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
        onViewportLeave={onViewportLeave}
        onViewportEnter={onViewportEnter}
      />
    </div>
  );
};
