import { useState } from 'react';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}

// Canvas-wide motion settings. Which animation each sticker uses lives on the sticker itself.
export default function useAnimation() {
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [speed, setSpeed] = useState(1);

  return {
    animationProps: {
      playing,
      speed,
      setPlaying,
      setSpeed,
    },
    reset: () => {
      setSpeed(1);
      setPlaying(!prefersReducedMotion());
    },
  };
}
