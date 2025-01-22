import { motion } from 'framer-motion';
import { headingIcons } from '../../assets/heading';
import Tooltip from './Tooltip.jsx';

const { sparkles, partyface, bouquet, pizza, teddy } = headingIcons;

export default function Heading() {
  return (
    <motion.header
      tabIndex={0}
      initial={{ opacity: 1, pointerEvents: 'auto' }}
      exit={{ opacity: 0, y: -30, pointerEvents: 'none' }}
      transition={{
        initial: { delay: 0.3, duration: 0.3 },
        exit: { duration: 0.3 },
      }}
      className="group relative cursor-default w-xs:mt-4"
      onClick={(event) => event.stopPropagation()}
    >
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
      <Tooltip />
    </motion.header>
  );
}
