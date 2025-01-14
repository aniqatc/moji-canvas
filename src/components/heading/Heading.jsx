import { motion } from "framer-motion";
import { headingIcons } from '../../assets/heading'
import { InfoButton } from '../reusable';

const { sparkles, partyface, bouquet, pizza, teddy } = headingIcons;

export default function Heading() {
    return (
        <div className="w-xs:mt-4 group relative cursor-default">
            <header className="relative">
                <motion.h1 initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
                           className="font-display text-[40px] sm:text-6xl text-accent-maroon">moji canvas</motion.h1>
                <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} src={sparkles} transition={{ delay: 0.5, type: "spring" }}
                            alt="sparkles emoji" className="absolute size-14 sm:size-20 top-3 sm:top-1 bottom-0 -left-12 sm:-left-16"/>
                <motion.img initial={{ scale: 0 }} animate={{ scale: 1, rotate: '45deg'}} transition={{ delay: 0.7, type: "spring" }}
                            src={pizza} alt="pizza emoji" className="absolute size-12 sm:size-16 -top-3 sm:-top-6 -left-4 sm:-left-20 rotate-45"/>
                <motion.img initial={{ scale: 0 }} animate={{ scale: 1, rotate: '25deg' }} transition={{ delay: 0.8, type: "spring" }}
                            src={bouquet} alt="bouquet emoji" className="absolute size-16 sm:size-20 -top-8 sm:-top-12 -right-11 sm:-right-14 rotate-[25deg]"/>
                <motion.img initial={{ scale: 0 }} animate={{ scale: 1, rotate: '-6deg' }} transition={{ delay: 0.9, type: "spring" }}
                            src={partyface} alt="party face emoji" className="absolute size-8 sm:size-10 -top-1 sm:-top-4 right-1 -rotate-6"/>
                <motion.img initial={{ scale: 0 }} animate={{ scale: 1, rotate: '12deg' }} transition={{ delay: 0.6, type: "spring" }}
                            src={teddy} alt="teddy emoji" className="absolute size-12 sm:size-16 top-4 sm:top-2 -right-11 sm:-right-16 rotate-12"/>
            </header>

            <div style={{
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
            }}
                 className="opacity-0 z-50 -translate-x-2/4 absolute top-14 sm:top-16 left-2/4 text-gray-600
                 text-[11px] sm:text-sm border border-gray-300/50 shadow-md rounded-md p-2 w-max bg-white/55 flex
                 items-center gap-1 sm:gap-2 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">
                <InfoButton />
                <div className="flex flex-col">
                    <span>Emoji stickers are designed by <a href="https://openmoji.org/" target="_blank" className="font-semibold underline text-gray-700 hover:text-black">OpenMoji</a>.</span>
                    <span>App designed and coded by <a href="https://aniqa.dev" target="_blank" className="font-semibold underline text-gray-700 hover:text-black">Aniqa</a>.</span>
                </div>
            </div>
        </div>
    )
}