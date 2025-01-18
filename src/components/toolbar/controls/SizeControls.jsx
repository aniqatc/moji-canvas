import { BaseSlider } from '../../reusable';

export default function SizeControls({ scale, setScale }) {
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
