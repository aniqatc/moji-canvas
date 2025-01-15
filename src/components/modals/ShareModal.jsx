import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TwitterShareButton, LinkedinShareButton, FacebookShareButton } from "react-share";
import { Butterfly, TwitterLogo, LinkedinLogo, FacebookLogo, ClipboardText, Check } from "@phosphor-icons/react";
import { Modal } from '../reusable';

export default function ShareModal({ isOpen, onClose }) {
    const [isCopied, setIsCopied] = useState(false);

    const shareURL = 'https://moji.aniqa.dev/';
    const title = "Check out this fun, interactive emoji-based sticker canvas! Created by @aniqatc.";
    const blueskyShareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${shareURL}`)}`;

    function handleLinkCopy() {
        navigator.clipboard.writeText(shareURL);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1200);
    }

    return (
        <Modal heading="Share Moji Canvas" isOpen={isOpen} onClose={onClose}>
            <p className="text-gray-700 mb-2">Moji Canvas is a fun, <strong>interactive emoji-based sticker canvas</strong>! Create, customize, and bring your digital space to life with <strong>4000+ unique emojis and stickers</strong>.
            </p>
            <button
                onClick={handleLinkCopy}
                className="group hover:outline hover:outline-gray-300 transition-all mb-2 w-full flex justify-between items-center text-gray-500 bg-gray-100 border px-2 py-1 rounded shadow-sm"
            >
                <p>{shareURL}</p>
                <AnimatePresence mode="wait">
                    {isCopied ? (
                        <motion.div
                            key="copied"
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.5}}
                            className="flex items-center"
                        >
                            <span className="text-[11px] mr-1">Copied!</span>
                            <Check size={24} weight="bold" color="#0da612"/>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="clipboard"
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.5}}
                        >
                            <ClipboardText size={24}/>
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
            <p className="font-semibold text-gray-700 mt-8">Share directly to your social media accounts:</p>
            <div className="mt-1 flex justify-between text-[11px] flex-col ml-4 w-fit">
                <a href={blueskyShareUrl} target="_blank" className="group flex items-center gap-1 hover:underline">
                    <Butterfly size={28} color="#1185FE" weight="duotone" className="group-hover:animate-shake"/>
                    Share on <strong>Bluesky</strong>
                </a>

                <TwitterShareButton url={shareURL} title={title}  className="group flex items-center gap-1 hover:underline">
                    <TwitterLogo size={28} color="#1DA1F2" weight="duotone" className="group-hover:animate-shake"/>
                    Share on <strong>Twitter</strong>
                </TwitterShareButton>

                <FacebookShareButton url={shareURL} quote={title} className="group flex items-center gap-1 hover:underline">
                    <FacebookLogo size={28} color="#1877F2" weight="duotone" className="group-hover:animate-shake"/>
                    Share on <strong>Facebook</strong>
                </FacebookShareButton>

                <LinkedinShareButton url={shareURL} title={title} className="group flex items-center gap-1 hover:underline">
                    <LinkedinLogo size={28} color="#0a66c2" weight="duotone" className="group-hover:animate-shake"/>
                    Share on <strong>Linkedin</strong>
                </LinkedinShareButton>
            </div>
        </Modal>
    )
}