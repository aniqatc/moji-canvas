import { BaseButton } from '../../reusable';
import { FloppyDisk, Download, Share, ArrowsCounterClockwise } from '@phosphor-icons/react';

export default function ActionButtons({ onReset, onDownload, onSave, onShare }) {
  return (
    <>
      <BaseButton ariaLabel="Save canvas to localStorage" onClick={onSave}>
        <FloppyDisk weight="bold" className="text-[26px] h-sm:text-[22px]" />
        <span>Save</span>
      </BaseButton>
        <BaseButton ariaLabel="Download canvas as png" onClick={onDownload}>
            <Download weight="bold" className="text-[26px] h-sm:text-[22px]" />
            <span>Download</span>
        </BaseButton>
      <BaseButton ariaLabel="Share canvas" onClick={onShare}>
        <Share weight="bold" className="text-[26px] h-sm:text-[22px]" />
        <span>Share</span>
      </BaseButton>
      <BaseButton ariaLabel="Reset canvas" onClick={onReset}>
        <ArrowsCounterClockwise weight="bold" className="text-[26px] h-sm:text-[22px]" />
        <span>Reset</span>
      </BaseButton>
    </>
  );
}
