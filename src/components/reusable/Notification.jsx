import { motion } from 'framer-motion';
import { Palette, FolderSimple, Broom, Warning } from '@phosphor-icons/react';

const notificationConfig = {
  save: {
    icon: Palette,
    title: 'Canvas saved!',
    message: 'Your design will be waiting for you.',
    color: 'text-green-600',
  },
  download: {
    icon: FolderSimple,
    title: 'Canvas downloaded!',
    message: 'Share your creation with others.',
    color: 'text-blue-600',
  },
  reset: {
    icon: Broom,
    title: 'Canvas reset!',
    message: 'Your canvas is now a clean slate.',
    color: 'text-pink-600',
  },
  notFound: {
    icon: Warning,
    title: 'Canvas not found!',
    message: 'Start fresh with a clean slate.',
    color: 'text-red-700',
  },
};

export default function Notification({ type }) {
  if (!type || !notificationConfig[type]) return null;

  const config = notificationConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 75 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 75 }}
      transition={{
        type: 'spring',
        duration: 2.75,
        opacity: {
          duration: 2.75,
          times: [0, 0.5, 0.85, 1],
          keyframes: [0, 1, 1, 0],
        },
      }}
      style={{ backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
      className="fixed bottom-4 right-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-md border border-gray-300 bg-white/80 p-2 shadow-lg"
    >
      <Icon className={`${config.color}`} size={26} weight="duotone" />
      <p className="w-[28ch] text-xs">
        <strong>{config.title} </strong>
        {config.message}
      </p>
    </motion.div>
  );
}
