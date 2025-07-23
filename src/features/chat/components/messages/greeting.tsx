import { motion } from 'motion/react';

export const Greeting = () => {
  return (
    <div
      className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center py-10"
      key="overview"
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="font-semibold text-2xl"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
      >
        嗨！
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl text-zinc-500"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.1 }}
      >
        有什么可以帮忙的？
      </motion.div>
    </div>
  );
};
