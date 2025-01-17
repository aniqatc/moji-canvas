import { HandTap } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export default function ClickHintText() {
  const transitionValue = { repeat: Infinity, repeatDelay: 0.2, duration: 0.8 };

  return (
    <motion.mark
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1, rotate: '20deg' }}
      transition={{ delay: 1.5, type: 'spring' }}
      exit={{ opacity: 0, y: -30, transition: { delay: 0.1, duration: 0.2 } }}
      className="relative -right-20 -top-24 flex rotate-[20deg] items-center gap-0.5 bg-highlight
      font-hand text-muted sm:-right-[200px] sm:-top-[96px] h-xs:-right-8 w-xs:top-44 w-xs:-rotate-0"
    >
      <motion.div animate={{ scale: [1, 0.88, 1] }} transition={transitionValue}>
        <HandTap weight="duotone" size="24" className="rotate-[15deg]" />
      </motion.div>
      <motion.span animate={{ opacity: [0.9, 0.5, 0.9] }} transition={transitionValue}>
        Click around to get started!
      </motion.span>
    </motion.mark>
  );
}