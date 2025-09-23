import type { ChatStatus, UIMessage } from 'ai';
import { AnimatePresence, motion } from 'motion/react';
import { Streamdown } from 'streamdown';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { cn } from '@/lib/utils';
import { PreviewAttachment } from '../chat-input-bar/preview-attachment';

export interface MessageProps {
  message: UIMessage;
  isLastMessage: boolean;
  status: ChatStatus;
  requiresScrollPadding: boolean;
}

export const Message: React.FC<MessageProps> = ({
  isLastMessage,
  status,
  message,
  requiresScrollPadding,
}) => {
  'use no memo';
  //  BUGFIX: See @https://github.com/vercel/ai/issues/6466
  const parts = message.parts;

  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <AnimatePresence>
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          'mx-auto flex max-w-2xl flex-col gap-1 py-5 empty:hidden',
          isUser ? 'items-end' : 'items-start',
          isAssistant && requiresScrollPadding && 'min-h-96'
        )}
        data-role={message.role}
        initial={{ y: 5, opacity: 0 }}
      >
        {parts.map((part, i) => {
          switch (part.type) {
            case 'reasoning':
              return (
                <Reasoning
                  className="w-full"
                  duration={undefined}
                  isStreaming={status === 'streaming' && isLastMessage}
                  key={`${message.id}-reasoning-${i}`}
                >
                  <ReasoningTrigger />
                  <ReasoningContent>{part.text}</ReasoningContent>
                </Reasoning>
              );
            case 'file':
              return (
                <PreviewAttachment
                  filePart={part}
                  key={`${message.id}-file-${i}`}
                />
              );
            case 'text':
              return (
                <div
                  className={cn(
                    'max-w-full',
                    isUser && 'rounded-3xl bg-muted px-5 py-2'
                  )}
                  key={`${message.id}-text-${i}`}
                >
                  <Streamdown>{part.text}</Streamdown>
                </div>
              );
            default:
              return null;
          }
        })}
      </motion.div>
    </AnimatePresence>
  );
};
