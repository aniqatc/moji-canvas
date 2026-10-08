import { BaseButton } from '../../reusable';
import { Minus, Plus, MagnifyingGlass } from '@phosphor-icons/react';
import { useCanvas, useUI } from '../../../contexts';

export default function StickerControls() {
  const { stickerMode, setStickerMode, setSelectedId } = useCanvas();
  const { togglePicker } = useUI();

  function handleModeChange(mode) {
    setStickerMode(mode);
    if (mode === 'remove') setSelectedId(null);
  }

  return (
    <>
      <BaseButton
        active={stickerMode === 'add'}
        ariaLabel="Add stickers to canvas"
        onClick={() => handleModeChange('add')}
      >
        <Plus weight="bold" className="text-[28px] h-sm:text-[24px]" />
      </BaseButton>
      <BaseButton
        active={stickerMode === 'remove'}
        ariaLabel="Remove stickers from canvas"
        onClick={() => handleModeChange('remove')}
      >
        <Minus weight="bold" className="text-[28px] h-sm:text-[24px]" />
      </BaseButton>
      <span>Mode</span>
      <BaseButton ariaLabel="Pick a specific sticker" onClick={togglePicker}>
        <MagnifyingGlass weight="bold" className="text-[26px] h-sm:text-[22px]" />
        <span>Pick</span>
      </BaseButton>
    </>
  );
}
