import { headingIcons } from '../../assets/heading'
import { InfoButton } from '../reusable';

const { sparkles, partyface, bouquet, pizza, teddy } = headingIcons;

export default function Heading() {
    return (
        <div className="w-xs:mt-4 group relative cursor-default">
            <header className="relative">
                <h1 className="font-display text-[40px] sm:text-6xl text-accent-maroon">moji canvas</h1>
                <img src={sparkles} alt="sparkles emoji" className="absolute size-14 sm:size-20 top-3 sm:top-1 bottom-0 -left-12 sm:-left-16"/>
                <img src={pizza} alt="pizza emoji" className="absolute size-12 sm:size-16 -top-3 sm:-top-6 -left-4 sm:-left-20 rotate-45"/>
                <img src={bouquet} alt="bouquet emoji" className="absolute size-16 sm:size-20 -top-8 sm:-top-12 -right-11 sm:-right-14 rotate-[25deg]"/>
                <img src={partyface} alt="party face emoji" className="absolute size-8 sm:size-10 -top-1 sm:-top-4 right-1 -rotate-6"/>
                <img src={teddy} alt="teddy emoji" className="absolute size-12 sm:size-16 top-4 sm:top-2 -right-11 sm:-right-16 rotate-12"/>
            </header>

            <div style={{
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
            }}
                 className="z-50 -translate-x-2/4 absolute top-14 sm:top-16 left-2/4 text-gray-600 text-[11px] sm:text-sm border border-gray-300 shadow-md rounded-md p-2 w-max bg-white/35 flex items-center gap-1 sm:gap-2 invisible group-hover:visible">
                <InfoButton />
                <div className="flex flex-col">
                    <span>Emoji stickers are designed by <a href="https://openmoji.org/" target="_blank" className="font-semibold underline text-gray-700 hover:text-black">OpenMoji</a>.</span>
                    <span>App designed and coded by <a href="https://aniqa.dev" target="_blank" className="font-semibold underline text-gray-700 hover:text-black">Aniqa</a>.</span>
                </div>
            </div>
        </div>
    )
}