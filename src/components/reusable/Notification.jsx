import { motion } from 'framer-motion';
import { Palette, FolderSimple, Broom } from '@phosphor-icons/react';

const notificationConfig = {
    save: {
        icon: Palette,
        title: 'Canvas saved!',
        message: 'Your design will be waiting for you.',
        color: 'text-green-600'
    },
    download: {
        icon: FolderSimple,
        title: 'Canvas downloaded!',
        message: 'Share your creation with others.',
        color: 'text-blue-600'
    },
    reset: {
        icon: Broom,
        title: 'Canvas reset!',
        message: 'Your canvas is now a clean slate.',
        color: 'text-red-600'
    }
};

export default function Notification({ type }) {
    if (!type) return;

    const config = notificationConfig[type];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{ backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
            className="border border-gray-300 fixed bottom-4 right-4 -translate-x-1/2 bg-white/80 shadow-lg rounded-md p-2 flex items-center gap-2 z-50"
        >
            <Icon className={`${config.color}`} size={26} weight="duotone" />
            <p className="text-xs w-[28ch]">
                <strong>{config.title} </strong>
                {config.message}
            </p>
        </motion.div>
    );
}