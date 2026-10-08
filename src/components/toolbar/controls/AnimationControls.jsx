import { Play, Pause, Shuffle } from '@phosphor-icons/react';
import { BaseButton, BaseSlider } from '../../reusable';
import { useCanvas } from '../../../contexts';
import { ANIMATION_STICKER_LIMIT } from '../../../utils';

// Canvas-wide motion. Each sticker's animation is chosen in the sticker panel.
export default function AnimationControls() {
  const { stickers, animationProps, togglePlaying, shuffleAnimations, isOverAnimationLimit } = useCanvas();
  const { playing, speed, setSpeed } = animationProps;
  const hasStickers = stickers.length > 0;

  const playLabel = isOverAnimationLimit
    ? `Animations pause above ${ANIMATION_STICKER_LIMIT} stickers`
    : playing
      ? 'Pause all animations'
      : 'Play all animations';

  return (
    <>
      <div className="flex justify-center gap-1">
        <span title={playLabel} className="flex">
          <BaseButton disabled={isOverAnimationLimit} ariaLabel={playLabel} onClick={togglePlaying}>
            {playing ? (
              <Pause weight="bold" className="text-[22px] h-sm:text-[18px]" />
            ) : (
              <Play weight="bold" className="text-[22px] h-sm:text-[18px]" />
            )}
          </BaseButton>
        </span>
        <span title="Give every sticker a random animation" className="flex">
          <BaseButton
            disabled={!hasStickers}
            ariaLabel="Give every sticker a random animation"
            onClick={shuffleAnimations}
          >
            <Shuffle weight="bold" className="text-[22px] h-sm:text-[18px]" />
          </BaseButton>
        </span>
      </div>
      <span>Motion</span>
      <BaseSlider
        id="speed-slider"
        min={0.25}
        max={2.5}
        step={0.25}
        value={speed}
        onChange={(event) => setSpeed(Number(event.target.value))}
        label="Speed"
        minLabel="0.25x"
        maxLabel="2.5x"
        disabled={!playing}
      />
    </>
  );
}
