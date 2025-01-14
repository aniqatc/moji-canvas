import { StickerControls, ThemeSelector, BackgroundChanger, AnimationControls, ActionButtons, SizeControls } from './controls';
import { InfoButton } from '../reusable';

export default function Toolbar() {
    return (
    <aside style={{
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
    }}
        className="h-max top-50 left-3 text-xs fixed bg-white bg-white/50 font-semibold
        border border-stone-200 shadow rounded-md p-2 flex flex-col gap-2 text-gray-500 text-center">
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
    return <div className="h-[1.5px] bg-stone-200 rounded" />
}
