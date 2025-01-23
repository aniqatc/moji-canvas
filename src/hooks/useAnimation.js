import { useState } from 'react';

export default function useAnimation() {
  const [animateMode, setAnimateMode] = useState(false);
  const [float, setFloat] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [speed, setSpeed] = useState(1);

  return {
    animationProps: {
      animateMode,
      float,
      rotate,
      speed,
      setRotate,
      setFloat,
      setSpeed,
      setAnimateMode,
    },
    reset: () => {
      setSpeed(1);
      setAnimateMode(false);
      setRotate(false);
      setFloat(false);
    },
  };
}
