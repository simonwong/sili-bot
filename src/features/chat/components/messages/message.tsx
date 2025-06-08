import { cn } from '@/lib/utils';
import { UIMessage } from 'ai';
import { AnimatePresence, motion } from 'motion/react';
import { PreviewAttachment } from '../chat-input-bar/preview-attachment';

export interface MessageProps {
  message: UIMessage;
  requiresScrollPadding: boolean;
}

export const Message: React.FC<MessageProps> = ({ message, requiresScrollPadding }) => {
  'use no memo';
  //  BUGFIX: See @https://github.com/vercel/ai/issues/6466
  const parts = message.parts;
  console.log('parts', parts);

  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const fileParts = parts.filter((part) => part.type === 'file');
  const textParts = parts.filter((part) => part.type === 'text');

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          'flex flex-col gap-1 empty:hidden max-w-2xl mx-auto py-5',
          isUser ? 'items-end' : 'items-start',
          isAssistant && requiresScrollPadding && 'min-h-96'
        )}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={message.role}
      >
        {fileParts.map((file, i) => {
          return <PreviewAttachment key={`${message.id}-file-${i}`} filePart={file} />;
        })}
        {textParts.map((text, i) => {
          return (
            <div
              className={cn(isUser && 'bg-muted rounded-3xl px-5 py-2')}
              key={`${message.id}-text-${i}`}
            >
              {text.text}
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
