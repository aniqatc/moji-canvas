import { getStickerByCategory } from './stickers.js';
import { generateRandomSizeAndPosition, positionBasedOnEvent } from './helpers.js';

async function canvasAddMode(event, metadata, category, setStickers, setDesigners) {
  const sticker = await getStickerByCategory(metadata, category);
  const computedSizes = generateRandomSizeAndPosition();
  const position = positionBasedOnEvent(event, computedSizes);
  const stickerWithStyles = {
    ...sticker,
    src: `/stickers/${sticker.hexcode}.svg`,
    id: Date.now() + sticker.hexcode,
    height: computedSizes.height,
    width: computedSizes.width,
    rotation: computedSizes.rotation,
    floatOffsets: computedSizes.floatOffsets,
    top: position.top,
    left: position.left,
    translateX: 0,
    translateY: 0,
  };
  setStickers((prev) => [...prev, stickerWithStyles]);
  setDesigners((prev) => [...prev, stickerWithStyles.openmoji_author]);
}

function canvasRemoveMode(stickerDiv, stickers, setStickers, designers, setDesigners) {
  const stickerToRemove = stickers.find((sticker) => sticker.id === stickerDiv.id);
  if (stickerToRemove) {
    const updatedStickers = stickers.filter((sticker) => sticker.id !== stickerDiv.id);
    setStickers(updatedStickers);

    const updatedDesigners = [...designers];
    updatedDesigners.splice(designers.indexOf(stickerToRemove.openmoji_author), 1); // remove only one occurrence
    setDesigners(updatedDesigners);

    return updatedStickers.length === 0;
  }
  return false;
}

export { canvasAddMode, canvasRemoveMode };
