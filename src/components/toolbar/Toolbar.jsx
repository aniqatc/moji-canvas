import { StickerControls, ThemeSelector, BackgroundChanger, AnimationControls, ActionButtons, SizeControls } from './controls';
import { InfoButton } from '../reusable';

export default function Toolbar() {
    return (
    <aside style={{
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
    }}
        className="h-sm:-translate-y-1/2 h-sm:top-1/2 h-xs:overflow-y-scroll h-xs:h-[444px] h-max top-50 h-sm:left-1 left-3 h-sm:text-[11px] text-xs fixed bg-white bg-white/60 font-semibold
        border border-stone-200 shadow rounded-md p-2 flex flex-col gap-2 text-gray-500 text-center h-sm:gap-1.5 h-sm:p-1.5">
            <StickerControls />
            <Separator />
            <ThemeSelector />
            <Separator />
            <BackgroundChanger />
            <Separator />
            <AnimationControls />
            <Separator />
            <SizeControls />
            <Separator />
            <ActionButtons />
            <InfoButton />
    </aside>
    )
}

function Separator() {
    return <div className="h-[1.5px] bg-stone-200 rounded flex-shrink-0" />
}
