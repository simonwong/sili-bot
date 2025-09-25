import { SentIcon, StopCircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ChatStatus } from 'ai';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ChatSendButtonProps {
  isAllowSend: boolean;
  status: ChatStatus;
  onClickSend: () => void | Promise<void>;
  onClickStop: () => void | Promise<void>;
}

const variants = {
  // 进入动画：从下方（y: 20）透明（opacity: 0）到原位（y: 0）不透明（opacity: 1）
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'spring' as const, stiffness: 800, damping: 30 }, // y方向使用弹簧动画
      opacity: { duration: 0.1 },
    },
  },
  // 初始状态（进入前）：在下方，透明
  initialEnter: {
    y: 20, // 从下方 20px 的位置开始
    opacity: 0,
  },
  // 退出动画：向上方（y: -20）移动并透明（opacity: 0）
  exit: {
    y: -20, // 向上方 20px 的位置移动
    opacity: 0,
    transition: {
      y: { type: 'spring' as const, stiffness: 800, damping: 30 },
      opacity: { duration: 0.1 },
    },
  },
};

export const ChatSendButton: React.FC<ChatSendButtonProps> = ({
  isAllowSend,
  status,
  onClickSend,
  onClickStop,
}) => {
  const isSending = status === 'streaming' || status === 'submitted';

  return (
    <Button
      className={cn(
        'relative rounded-full p-4 transition-all hover:opacity-80'
      )}
      disabled={!(isSending || isAllowSend)}
      onClick={(event) => {
        event.preventDefault();

        if (isSending) {
          onClickStop();
        } else {
          onClickSend();
        }
      }}
      size="icon"
    >
      <AnimatePresence>
        {isSending ? (
          <motion.div
            animate="enter"
            className="absolute"
            exit="exit"
            initial="initialEnter"
            key="stop"
            variants={variants}
          >
            <HugeiconsIcon icon={StopCircleIcon} />
          </motion.div>
        ) : (
          <motion.div
            animate="enter"
            className="absolute"
            exit="exit"
            initial="initialEnter"
            key="send"
            variants={variants}
          >
            <HugeiconsIcon icon={SentIcon} />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};
