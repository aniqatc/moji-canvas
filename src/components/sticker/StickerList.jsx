import Sticker from './Sticker';
import { AnimatePresence } from 'framer-motion';
import { useCanvas } from '../../contexts';

export default function StickerList({ constraintsRef }) {
  const { stickers } = useCanvas();

  // Array order is stacking order: later stickers sit on top ("Bring to front" moves one to the end).
  return (
    <AnimatePresence>
      {stickers.map((sticker) => (
        <Sticker key={sticker.id} sticker={sticker} constraintsRef={constraintsRef} />
      ))}
    </AnimatePresence>
  );
}
