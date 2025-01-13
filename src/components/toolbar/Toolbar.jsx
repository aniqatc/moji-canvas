import { StickerControls, ThemeSelector } from './controls';

export default function Toolbar() {
    return (
    <aside style={{
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
    }}
        className="top-4 left-3 bottom-4 text-xs fixed bg-white bg-white/20 font-semibold
        border border-stone-200 shadow rounded-md p-2 flex flex-col gap-2 text-gray-500 text-center">
            <StickerControls />
            <Separator />
            <ThemeSelector />
            <Separator />
    </aside>
    )
}

function Separator() {
    return <div className="h-[1.5px] bg-stone-200 rounded" />
}