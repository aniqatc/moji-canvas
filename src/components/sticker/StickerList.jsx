import Sticker from './Sticker';
import { AnimatePresence } from 'framer-motion';
import { useCanvas } from '../../contexts';

export default function StickerList({ constraintsRef, controls }) {
  const { setIsDragging, stickers, animationProps } = useCanvas();
  const { animateMode } = animationProps;

  return (
    <AnimatePresence>
      {stickers.map((sticker) => {
        return (
          <Sticker
            key={`${sticker.id}-${animateMode}`}
            drag
            dragControls={controls}
            onDragStart={() => setIsDragging(true)}
            whileDrag={{ cursor: 'grabbing' }}
            dragConstraints={constraintsRef}
            sticker={sticker}
          />
        );
      })}
    </AnimatePresence>
  );
}
