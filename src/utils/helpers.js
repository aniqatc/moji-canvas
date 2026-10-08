function positionBasedOnEvent(event, computedSizes) {
  const hasPointer = event && typeof event.clientX === 'number' && event.type !== 'keydown';
  const size = parseInt(computedSizes.height);

  return hasPointer
    ? {
        top: event.clientY - size / 2 + 'px',
        left: event.clientX - size / 2 + 'px',
      }
    : {
        top: Math.random() * Math.max(window.innerHeight - 200, 0) + 'px',
        left: Math.random() * Math.max(window.innerWidth - 200, 0) + 'px',
      };
}

function generateRandomSizeAndPosition() {
  const size = Math.floor(Math.random() * 100 + 100);
  return {
    width: size + 'px',
    height: size + 'px',
    rotation: Math.round(getPositiveOrNegativeValue() * Math.random() * 360),
    floatOffsets: {
      x: [getFloatOffset(window.innerWidth, 0.35), getFloatOffset(window.innerWidth, 0.35)],
      y: [getFloatOffset(window.innerHeight, 0.35), getFloatOffset(window.innerHeight, 0.35)],
    },
  };
}

function getPositiveOrNegativeValue() {
  return Math.random() > 0.5 ? -1 : 1;
}

function getFloatOffset(limit, portion) {
  return getPositiveOrNegativeValue() * Math.random() * (limit * portion);
}

// True when a key press should be left to the focused control
// (typing in a field, pressing a button, picking from a menu, using a dialog).
function isInteractiveTarget(target) {
  return Boolean(
    target?.closest?.('input, textarea, select, button, a, [role="option"], [role="listbox"], [aria-modal="true"]')
  );
}

function isTextEntryTarget(target) {
  return Boolean(target?.closest?.('input, textarea, select, [role="option"], [role="listbox"]'));
}

export { generateRandomSizeAndPosition, positionBasedOnEvent, isInteractiveTarget, isTextEntryTarget };
