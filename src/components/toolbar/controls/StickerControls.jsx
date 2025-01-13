import BaseButton from '../BaseButton.jsx';
import { Minus, Plus } from "@phosphor-icons/react";

export default function StickerControls() {
    return (
        <>
            <BaseButton active={true} >
                <Plus size="28" weight="bold" />
            </BaseButton>
            <BaseButton>
                <Minus size="28" weight="bold" />
            </BaseButton>
            <span>Mode</span>
        </>
    )
}