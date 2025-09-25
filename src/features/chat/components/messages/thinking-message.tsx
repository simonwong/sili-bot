import { Robot02Icon, SparklesIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export const ThinkingMessage = () => {
  const role = 'assistant';

  return (
    <motion.div
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      className="group/message mx-auto min-h-96 w-full max-w-3xl px-4"
      data-role={role}
      initial={{ y: 5, opacity: 0 }}
    >
      <div
        className={cn(
          'flex w-full items-center gap-4 rounded-xl group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:px-3 group-data-[role=user]/message:py-2',
          {
            'group-data-[role=user]/message:bg-muted': true,
          }
        )}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-border">
          <HugeiconsIcon icon={Robot02Icon} size={14} />
        </div>

        <div className="text-muted-foreground">Hmm...</div>
      </div>
    </motion.div>
  );
};
