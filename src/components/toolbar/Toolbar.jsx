import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { InfoButton } from '../reusable';
import {
  StickerControls,
  ThemeSelector,
  BackgroundChanger,
  AnimationControls,
  ActionButtons,
  SizeControls,
} from './controls';

function Toolbar({ disableButton }, ref) {
  return (
    <motion.aside
      aria-label="Canvas controls"
      onClick={(event) => event.stopPropagation()}
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
      style={{
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
      }}
      className="centering-override custom-scrollbar top-50 fixed left-3 flex h-max flex-col gap-1.5 rounded-md border border-stone-200 bg-white bg-white/85 p-2 text-center text-xs font-semibold text-gray-600 shadow h-sm:left-1 h-sm:gap-1.5 h-sm:p-1.5 h-sm:text-[11px] h-xs:h-[506px] h-xs:overflow-y-scroll"
    >
      <StickerControls />
      <Separator />
      <ThemeSelector />
      <Separator />
      <BackgroundChanger />
      <Separator />
      <AnimationControls />
      <Separator />
      <SizeControls />
      <Separator />
      <ActionButtons disableButton={disableButton} ref={ref} />
      <InfoButton />
    </motion.aside>
  );
}

function Separator() {
  return <hr className="h-[1.5px] flex-shrink-0 rounded bg-stone-300/70" />;
}

export default forwardRef(Toolbar);
