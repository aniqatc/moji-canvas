import { forwardRef, useEffect, useState } from 'react';
import { FloppyDisk, Download, Share, ArrowsCounterClockwise } from '@phosphor-icons/react';
import { useCanvas, useUI } from '../../../contexts';
import { downloadImage } from '../../../utils';
import { BaseButton } from '../../reusable';

function ActionButtons({ disableButton = false }, ref) {
  const { handleSave, handleReset, handleShare, setSelectedId } = useCanvas();
  const { renderNotification, toggleShareModal } = useUI();
  const [confirmReset, setConfirmReset] = useState(false);

  // Reset asks for a second tap within 3 seconds.
  useEffect(() => {
    if (!confirmReset) return;
    const timeoutId = setTimeout(() => setConfirmReset(false), 3000);
    return () => clearTimeout(timeoutId);
  }, [confirmReset]);

  function onReset() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    setConfirmReset(false);
    handleReset();
  }

  return (
    <>
      <BaseButton ariaLabel="Save canvas to this browser" onClick={handleSave}>
        <FloppyDisk weight="bold" className="text-[26px] h-sm:text-[22px]" />
        <span>Save</span>
      </BaseButton>
      <BaseButton
        disabled={disableButton}
        ariaLabel="Download canvas as png"
        onClick={() => {
          setSelectedId(null);
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
          handleShare();
          toggleShareModal();
        }}
      >
        <Share weight="bold" className="text-[26px] h-sm:text-[22px]" />
        <span>Share</span>
      </BaseButton>
      <BaseButton
        active={confirmReset}
        ariaLabel={confirmReset ? 'Tap again to clear the canvas' : 'Reset canvas'}
        onClick={onReset}
        className={confirmReset ? '!border-red-300 !bg-red-50 !text-red-700' : ''}
      >
        <ArrowsCounterClockwise weight="bold" className="text-[26px] h-sm:text-[22px]" />
        <span>{confirmReset ? 'Sure?' : 'Reset'}</span>
      </BaseButton>
    </>
  );
}

export default forwardRef(ActionButtons);
