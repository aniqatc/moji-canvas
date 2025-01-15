import { BaseSlider } from '../../reusable';

export default function AnimationControls({
  animateMode,
  float,
  rotate,
  speed,
  setRotate,
  setFloat,
  setSpeed,
  setAnimateMode,
  stickerLength,
}) {
  if (stickerLength >= 50) {
    setAnimateMode(false);
    setFloat(false);
    setSpeed(false);
    setRotate(false);
  }
  return (
    <>
      <fieldset className="mx-auto flex flex-col gap-0.5 accent-slate-500">
        <div key="animation-checkbox" className="flex items-center gap-1">
          <input
            className={`${stickerLength < 50 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            type="checkbox"
            id="animation-checkbox"
            disabled={stickerLength >= 50}
            checked={animateMode}
            onChange={() => {
              setAnimateMode(!animateMode);
              setRotate(!animateMode);
              setFloat(!animateMode);
            }}
          />
          <label
            htmlFor="animation-checkbox"
            className={`${stickerLength < 50 ? 'cursor-pointer' : 'cursor-not-allowed text-gray-500/85'}`}
          >
            Animate
          </label>
        </div>
        <div key="float-checkbox" className="flex items-center gap-1">
          <input
            type="checkbox"
            id="float-checkbox"
            className={`${animateMode ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            disabled={!animateMode}
            checked={float}
            onChange={() => {
              setFloat(!float);
            }}
          />
          <label
            htmlFor="float-checkbox"
            className={`${animateMode ? 'cursor-pointer' : 'cursor-not-allowed text-gray-500/85'}`}
          >
            Float
          </label>
        </div>
        <div key="rotate-checkbox" className="flex items-center gap-1">
          <input
            type="checkbox"
            id="rotate-checkbox"
            className={`${animateMode ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            disabled={!animateMode}
            checked={rotate}
            onChange={() => {
              setRotate(!rotate);
            }}
          />
          <label
            htmlFor="rotate-checkbox"
            className={`${animateMode ? 'cursor-pointer' : 'cursor-not-allowed text-gray-500/85'}`}
          >
            Rotate
          </label>
        </div>
      </fieldset>
      <BaseSlider
        id="speed-slider"
        min={0}
        max={2}
        step={0.25}
        value={speed}
        onChange={(event) => setSpeed(Number(event.target.value))}
        label="Speed"
        disabled={!animateMode}
      />
    </>
  );
}
