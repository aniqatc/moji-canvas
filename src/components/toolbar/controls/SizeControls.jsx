import { useState } from 'react';
import { BaseSlider } from '../../reusable';

export default function SizeControls() {
  const [scale, setScale] = useState(1);

  return (
    <BaseSlider
      id="scale-slider"
      min={0}
      max={2}
      step={0.1}
      value={scale}
      onChange={(event) => setScale(event.target.value)}
      label="Scale"
    />
  );
}
