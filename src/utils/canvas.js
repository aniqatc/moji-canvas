import { generateRandomSizeAndPosition, positionBasedOnEvent } from './helpers.js';
import { normalizeSticker } from './animations.js';

// Turns a metadata entry into a sticker placed where the user clicked
// (or at a random spot for keyboard input and the sticker picker).
function createSticker(metadataEntry, event) {
  const computedSizes = generateRandomSizeAndPosition();
  const position = positionBasedOnEvent(event, computedSizes);

  return normalizeSticker({
    ...metadataEntry,
    src: `/stickers/${metadataEntry.hexcode}.svg`,
    id: `${Date.now()}${metadataEntry.hexcode}`,
    height: computedSizes.height,
    width: computedSizes.width,
    rotation: computedSizes.rotation,
    floatOffsets: computedSizes.floatOffsets,
    top: position.top,
    left: position.left,
    translateX: 0,
    translateY: 0,
    size: 1,
    animation: 'none',
  });
}

export { createSticker };
