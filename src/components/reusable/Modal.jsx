import { useState } from 'react';
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
                    className="backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50 bg-black/55"
                    onClick={handleModalClick}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-sm:min-w-[80%] min-w-96 bg-white rounded shadow-lg p-6"
                    >
                        <div className="flex justify-between items-center border-b pb-2 mb-2">
                            <p className="text-lg font-semibold flex items-center">
                                <img src={all} className="size-8"/>{heading}</p>
                            <button
                                onClick={() => onClose()}
                                className="cursor-pointer text-gray-500 duration-500 hover:text-gray-900 hover:rotate-[180deg] transition-all origin-center"
                            >
                                <X weight="bold" size="24"/>
                            </button>
                        </div>
                        <div className="text-sm text-gray-800">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}