import { motion } from 'framer-motion';
import { headingIcons } from '../../assets/heading';
import { InfoButton } from '../reusable';

const { sparkles, partyface, bouquet, pizza, teddy } = headingIcons;

export default function Heading({ openModal }) {
  return (
    <header className="group relative cursor-default w-xs:mt-4">
      <div className="relative">
        <motion.h1
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.1, duration: 0.5, type: 'spring' }}
          className="font-display text-[40px] text-accent-maroon sm:text-6xl"
        >
          moji canvas
        </motion.h1>
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          src={sparkles}
          transition={{ delay: 0.5, type: 'spring' }}
          alt="sparkles emoji"
          className="absolute -left-12 bottom-0 top-3 size-14 sm:-left-16 sm:top-1 sm:size-20"
        />
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: '45deg' }}
          transition={{ delay: 0.7, type: 'spring' }}
          src={pizza}
          alt="pizza emoji"
          className="absolute -left-4 -top-3 size-12 rotate-45 sm:-left-20 sm:-top-6 sm:size-16"
        />
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: '25deg' }}
          transition={{ delay: 0.8, type: 'spring' }}
          src={bouquet}
          alt="bouquet emoji"
          className="absolute -right-11 -top-8 size-16 rotate-[25deg] sm:-right-14 sm:-top-12 sm:size-20"
        />
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: '-6deg' }}
          transition={{ delay: 0.9, type: 'spring' }}
          src={partyface}
          alt="party face emoji"
          className="absolute -top-1 right-1 size-8 -rotate-6 sm:-top-4 sm:size-10"
        />
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: '12deg' }}
          transition={{ delay: 0.6, type: 'spring' }}
          src={teddy}
          alt="teddy emoji"
          className="absolute -right-11 top-4 size-12 rotate-12 sm:-right-16 sm:top-2 sm:size-16"
        />
      </div>

      <div
        style={{
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
        className="invisible absolute left-2/4 top-14 z-50 flex w-max -translate-x-2/4 items-center gap-1 rounded-md border border-gray-300/50 bg-white/55 p-2 text-[11px] text-gray-600 opacity-0 shadow-md transition-all duration-300 group-hover:visible group-hover:opacity-100 sm:top-16 sm:gap-2 sm:text-sm"
      >
        <InfoButton openModal={() => openModal()} />
        <div className="flex flex-col">
          <span>
            Emoji stickers are designed by{' '}
            <a
              href="https://openmoji.org/"
              target="_blank"
              className="font-semibold text-gray-700 underline hover:text-black"
            >
              OpenMoji
            </a>
            .
          </span>
          <span>
            App designed and coded by{' '}
            <a
              href="https://aniqa.dev"
              target="_blank"
              className="font-semibold text-gray-700 underline hover:text-black"
            >
              Aniqa
            </a>
            .
          </span>
        </div>
      </div>
    </header>
  );
}
