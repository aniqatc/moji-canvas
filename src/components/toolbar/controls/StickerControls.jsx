import { useState } from 'react';
import { BaseButton } from '../../reusable';
import { Minus, Plus } from '@phosphor-icons/react';

export default function StickerControls({ onStickerMode }) {
    const [activeButton, setActiveButton] = useState('add');

    function handleButtonClick(mode) {
        setActiveButton(mode);
        onStickerMode(mode);
    }

    return (
    <>
      <BaseButton
          active={activeButton === 'add'}
          ariaLabel="Add stickers to canvas"
          onClick={() => handleButtonClick('add')}>
        <Plus
            weight="bold"
            className="text-[28px] h-sm:text-[24px]" />
      </BaseButton>
      <BaseButton
          active={activeButton === 'remove'}
          ariaLabel="Remove stickers from canvas"
          onClick={() => handleButtonClick('remove')}>
        <Minus
            weight="bold"
            className="text-[28px] h-sm:text-[24px]" />
      </BaseButton>
      <span>Mode</span>
    </>
  );
}
