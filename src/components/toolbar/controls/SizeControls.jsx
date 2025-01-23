import { BaseSlider } from '../../reusable';
import { useCanvas } from '../../../contexts';

export default function SizeControls() {
  const { setScale, scale } = useCanvas();

  return (
    <BaseSlider
      id="scale-slider"
      min={0}
      max={2}
      step={0.1}
      value={scale}
      onChange={(event) => {
        setScale(event.target.value);
      }}
      label="Scale"
    />
  );
}
