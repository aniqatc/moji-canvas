import { BaseButton } from '../../reusable';
import { Minus, Plus } from "@phosphor-icons/react";

export default function StickerControls() {
    return (
        <>
            <BaseButton active={true} ariaLabel="Add stickers to canvas" onClick={() => {}}>
                <Plus weight="bold" className="text-[28px] h-sm:text-[24px]"/>
            </BaseButton>
            <BaseButton ariaLabel="Remove stickers from canvas" onClick={() => {}}>
                <Minus weight="bold" className="text-[28px] h-sm:text-[24px]"/>
            </BaseButton>
            <span>Mode</span>
        </>
    )
}