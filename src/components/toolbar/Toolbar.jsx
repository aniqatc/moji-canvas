import { motion } from 'framer-motion';
import {
  StickerControls,
  ThemeSelector,
  BackgroundChanger,
  AnimationControls,
  ActionButtons,
  SizeControls,
} from './controls';
import { InfoButton } from '../reusable';

export default function Toolbar({
  animationProps,
  backgroundProps,
  onStickerMode,
  onReset,
  onThemeSelect,
  onScaleChange,
  onSave,
  onShare,
  onDownload,
  openModal,
  disableButton,
}) {
  return (
    <motion.aside
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
      <StickerControls onStickerMode={onStickerMode} />
      <Separator />
      <ThemeSelector onThemeSelect={onThemeSelect} />
      <Separator />
      <BackgroundChanger {...backgroundProps} />
      <Separator />
      <AnimationControls {...animationProps} />
      <Separator />
      <SizeControls onScaleChange={onScaleChange} />
      <Separator />
      <ActionButtons
        onReset={onReset}
        onSave={onSave}
        onShare={onShare}
        onDownload={onDownload}
        disableButton={disableButton}
      />
      <InfoButton openModal={openModal} />
    </motion.aside>
  );
}

function Separator() {
  return <div className="h-[1.5px] flex-shrink-0 rounded bg-stone-300/70" />;
}
