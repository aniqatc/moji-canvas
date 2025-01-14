import { motion } from "framer-motion";
import { StickerControls, ThemeSelector, BackgroundChanger, AnimationControls, ActionButtons, SizeControls } from './controls';
import { InfoButton } from '../reusable';

export default function Toolbar({ backgroundProps }) {
    return (
    <motion.aside initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
        style={{
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
    }}
        className="h-xs:overflow-y-scroll h-xs:h-[444px] h-max top-50 h-sm:left-1 left-3 h-sm:text-[11px] text-xs fixed bg-white bg-white/65 font-semibold
        border border-stone-200 shadow rounded-md p-2 flex flex-col gap-2 text-gray-600 text-center h-sm:gap-1.5 h-sm:p-1.5">
            <StickerControls />
            <Separator />
            <ThemeSelector />
            <Separator />
            <BackgroundChanger {...backgroundProps} />
            <Separator />
            <AnimationControls />
            <Separator />
            <SizeControls />
            <Separator />
            <ActionButtons />
            <InfoButton />
    </motion.aside>
    )
}

function Separator() {
    return <div className="h-[1.5px] bg-stone-300/70 rounded flex-shrink-0" />
}
