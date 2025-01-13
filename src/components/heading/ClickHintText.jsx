import { HandTap } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export default function ClickHintText() {
    const transitionValue = { repeat: Infinity, repeatDelay: 0.2, duration: 0.8 };

    return (
    <mark className="bg-highlight-maroon text-muted-maroon font-hand relative -top-[96px] -right-[200px] rotate-[20deg] flex items-center gap-0.5">
        <motion.div animate={{ scale: [1, 0.88, 1] }} transition={transitionValue}>
            <HandTap weight="duotone" size="24" className="rotate-[15deg]"/>
        </motion.div>
        <motion.span animate={{ opacity: [0.9, 0.5, 0.9] }} transition={transitionValue}>Click around to get started!</motion.span>
    </mark>
    )
}