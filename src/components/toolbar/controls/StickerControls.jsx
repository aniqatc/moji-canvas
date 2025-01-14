import { BaseButton } from '../../reusable';
import { Minus, Plus } from "@phosphor-icons/react";

export default function StickerControls() {
    return (
        <>
            <BaseButton active={true} ariaLabel="Add stickers to canvas" onClick={() => {}}>
                <Plus size="28" weight="bold" />
            </BaseButton>
            <BaseButton ariaLabel="Remove stickers from canvas" onClick={() => {}}>
                <Minus size="28" weight="bold" />
            </BaseButton>
            <span>Mode</span>
        </>
    )
}