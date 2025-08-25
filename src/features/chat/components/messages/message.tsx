import type { UIMessage } from 'ai';
import { AnimatePresence, motion } from 'motion/react';
import { Streamdown } from 'streamdown';
import { cn } from '@/lib/utils';
import { PreviewAttachment } from '../chat-input-bar/preview-attachment';

export interface MessageProps {
  message: UIMessage;
  requiresScrollPadding: boolean;
}

export const Message: React.FC<MessageProps> = ({
  message,
  requiresScrollPadding,
}) => {
  'use no memo';
  //  BUGFIX: See @https://github.com/vercel/ai/issues/6466
  const parts = message.parts;

  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const fileParts = parts.filter((part) => part.type === 'file');
  const textParts = parts.filter((part) => part.type === 'text');

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
        {fileParts.map((file, i) => {
          return (
            <PreviewAttachment
              filePart={file}
              key={`${message.id}-file-${i}`}
            />
          );
        })}
        {textParts.map((text, i) => {
          return (
            <div
              className={cn(
                'max-w-full',
                isUser && 'rounded-3xl bg-muted px-5 py-2'
              )}
              key={`${message.id}-text-${i}`}
            >
              <Streamdown>{text.text}</Streamdown>
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
