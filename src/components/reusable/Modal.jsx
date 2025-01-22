import FocusLock from 'react-focus-lock';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import all from '../../assets/themes/all.svg';

export default function Modal({ heading, children, isOpen, onClose }) {
  function handleModalClick(event) {
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm"
          onClick={handleModalClick}
        >
          <FocusLock returnFocus={true}>
          <motion.div
            aria-modal="true"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[500px] cursor-default rounded bg-white px-5 py-4 shadow-xl h-sm:max-w-[90%]"
          >
            <div className="mb-2 flex items-center justify-between border-b pb-2">
              <p className="flex items-center text-lg font-semibold">
                <img src={all} className="size-8" />
                {heading}
              </p>
              <button
                onClick={() => onClose()}
                className="origin-center cursor-pointer text-gray-500 transition-all duration-500 hover:rotate-[180deg] hover:text-gray-900"
              >
                <X weight="bold" size="24" />
              </button>
            </div>
            <div className="text-[13px] text-gray-800">{children}</div>
          </motion.div>
          </FocusLock>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
