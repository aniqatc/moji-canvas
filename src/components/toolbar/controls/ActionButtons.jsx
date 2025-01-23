import { forwardRef } from 'react';
import { FloppyDisk, Download, Share, ArrowsCounterClockwise } from '@phosphor-icons/react';
import { useCanvas, useUI } from '../../../contexts';
import { downloadImage } from '../../../utils';
import { BaseButton } from '../../reusable';

function ActionButtons({ disableButton = false }, ref) {
  const { handleSave, handleReset } = useCanvas();
  const { renderNotification, toggleShareModal } = useUI();

  return (
    <>
      <BaseButton ariaLabel="Save canvas to localStorage" onClick={handleSave}>
        <FloppyDisk weight="bold" className="text-[26px] h-sm:text-[22px]" />
        <span>Save</span>
      </BaseButton>
      <BaseButton
        disabled={disableButton}
        ariaLabel="Download canvas as png"
        onClick={() => {
          downloadImage(ref);
          renderNotification('download');
        }}
      >
        <Download weight="bold" className="text-[26px] h-sm:text-[22px]" />
        <span>Download</span>
      </BaseButton>
      <BaseButton
        ariaLabel="Share canvas"
        onClick={() => {
          handleSave();
          toggleShareModal();
        }}
      >
        <Share weight="bold" className="text-[26px] h-sm:text-[22px]" />
        <span>Share</span>
      </BaseButton>
      <BaseButton ariaLabel="Reset canvas" onClick={handleReset}>
        <ArrowsCounterClockwise weight="bold" className="text-[26px] h-sm:text-[22px]" />
        <span>Reset</span>
      </BaseButton>
    </>
  );
}

export default forwardRef(ActionButtons);
