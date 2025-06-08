import { motion } from 'motion/react';

export const Greeting = () => {
  return (
    <div
      key="overview"
      className="max-w-2xl w-full mx-auto flex flex-col justify-center items-center py-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="text-2xl font-semibold"
      >
        嗨！
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.1 }}
        className="text-2xl text-zinc-500"
      >
        有什么可以帮忙的？
      </motion.div>
    </div>
  );
};
