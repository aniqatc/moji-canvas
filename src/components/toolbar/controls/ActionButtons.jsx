import BaseButton from '../BaseButton.jsx';
import { Download, Share, ArrowsCounterClockwise } from "@phosphor-icons/react";


export default function ActionButtons() {
    return <>
        <BaseButton ariaLabel="Save canvas as png image" onClick={() => {
        }}>
            <Download size="24" weight="bold"/>
            <span>Save</span>
        </BaseButton>
        <BaseButton disabled="true" ariaLabel="Share canvas" onClick={() => {
        }}>
            <Share size="24" weight="bold"/>
            <span>Share</span>
        </BaseButton>
        <BaseButton ariaLabel="Reset canvas" onClick={() => {}}>
            <ArrowsCounterClockwise size="24" weight="bold" />
            <span>Reset</span>
        </BaseButton>
    </>
}