// Per-sticker animations. Each id maps to an `anim-<id>` class in index.css.
export const ANIMATIONS = [
  { id: 'none', label: 'None' },
  { id: 'drift', label: 'Drift' },
  { id: 'float', label: 'Float' },
  { id: 'bounce', label: 'Bounce' },
  { id: 'spin', label: 'Spin' },
  { id: 'wobble', label: 'Wobble' },
  { id: 'pulse', label: 'Pulse' },
  { id: 'jelly', label: 'Jelly' },
  { id: 'swing', label: 'Swing' },
  { id: 'shake', label: 'Shake' },
  { id: 'orbit', label: 'Orbit' },
];

export const ANIMATION_IDS = ANIMATIONS.map((animation) => animation.id);

// Animations are paused above this many stickers to keep dragging smooth.
export const ANIMATION_STICKER_LIMIT = 40;
export const MAX_STICKERS = 150;

export function randomAnimation() {
  const moving = ANIMATION_IDS.filter((id) => id !== 'none');
  return moving[Math.floor(Math.random() * moving.length)];
}

// Brings stickers saved by older versions of the app (in localStorage or Supabase)
// up to the current shape: numeric rotation, per-sticker size and animation.
export function normalizeSticker(sticker) {
  const rotation = typeof sticker.rotation === 'number' ? sticker.rotation : parseFloat(sticker.rotation);
  return {
    ...sticker,
    rotation: Number.isFinite(rotation) ? Math.round(rotation) : 0,
    size: typeof sticker.size === 'number' ? sticker.size : 1,
    speed: typeof sticker.speed === 'number' ? sticker.speed : 1,
    animation: ANIMATION_IDS.includes(sticker.animation) ? sticker.animation : 'none',
    translateX: sticker.translateX ?? 0,
    translateY: sticker.translateY ?? 0,
  };
}
