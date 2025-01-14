import { BaseButton } from '../../reusable';
import { Download, Share, ArrowsCounterClockwise } from '@phosphor-icons/react';

export default function ActionButtons({ onReset }) {
  return (
    <>
      <BaseButton ariaLabel="Save canvas as png image" onClick={() => {}}>
        <Download weight="bold" className="text-[28px] h-sm:text-[24px]" />
        <span>Save</span>
      </BaseButton>
      <BaseButton disabled={true} ariaLabel="Share canvas" onClick={() => {}}>
        <Share weight="bold" className="text-[28px] h-sm:text-[24px]" />
        <span>Share</span>
      </BaseButton>
      <BaseButton ariaLabel="Reset canvas" onClick={onReset}>
        <ArrowsCounterClockwise weight="bold" className="text-[28px] h-sm:text-[24px]" />
        <span>Reset</span>
      </BaseButton>
    </>
  );
}
