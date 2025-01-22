import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TwitterShareButton, LinkedinShareButton, FacebookShareButton } from 'react-share';
import {
  Butterfly,
  TwitterLogo,
  LinkedinLogo,
  FacebookLogo,
  ClipboardText,
  Check,
} from '@phosphor-icons/react';
import { Modal } from '../reusable';
import { useUI } from '../../contexts';

export default function ShareModal({ canvasId }) {
  const { shareModalOpen, toggleShareModal } = useUI();
  const [isCopied, setIsCopied] = useState(false);

  const shareURL = `https://moji.aniqa.dev/${canvasId ? canvasId : ''}`;
  const title =
    'Check out this fun, interactive emoji-based sticker canvas! App built by @aniqa.dev.';
  const blueskyShareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${shareURL}`)}`;

  function handleLinkCopy() {
    navigator.clipboard.writeText(shareURL);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1200);
  }

  return (
    <Modal
      heading="Share Moji Canvas"
      isOpen={shareModalOpen}
      onClose={toggleShareModal}
      aria-label="Modal with links to share your unique sticker canvas to social media"
    >
      <p className="mb-2 text-gray-700">
        Moji Canvas is a fun, <strong>interactive emoji-based sticker canvas</strong>! Create,
        customize, and bring your digital space to life with{' '}
        <strong>4000+ unique emojis and stickers</strong>.
      </p>
      <button
        onClick={handleLinkCopy}
        className="group mb-2 flex w-full items-center justify-between gap-4 rounded border bg-gray-100 px-2 py-1 text-start text-gray-500 shadow-sm transition-all hover:outline hover:outline-gray-300"
      >
        <p className="truncate">{shareURL}</p>
        <AnimatePresence mode="wait">
          {isCopied ? (
            <motion.div
              key="copied"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center"
            >
              <span className="mr-1 text-[11px]">Copied!</span>
              <Check size={24} weight="bold" color="#0da612" />
            </motion.div>
          ) : (
            <motion.div
              key="clipboard"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <ClipboardText size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <p className="mt-8 font-semibold text-gray-700">
        Share directly to your social media accounts:
      </p>
      <div className="ml-4 mt-1 flex w-fit flex-col justify-between text-[11px]">
        <a
          href={blueskyShareUrl}
          target="_blank"
          className="group flex items-center gap-1 hover:underline"
        >
          <Butterfly
            size={28}
            color="#1185FE"
            weight="duotone"
            className="group-hover:animate-shake"
          />
          Share on <strong>Bluesky</strong>
        </a>

        <TwitterShareButton
          url={shareURL}
          title={title + ' Created by @aniqatc.'}
          className="group flex items-center gap-1 hover:underline"
        >
          <TwitterLogo
            size={28}
            color="#1DA1F2"
            weight="duotone"
            className="group-hover:animate-shake"
          />
          Share on <strong>Twitter</strong>
        </TwitterShareButton>

        <FacebookShareButton
          url={shareURL}
          quote={title}
          className="group flex items-center gap-1 hover:underline"
        >
          <FacebookLogo
            size={28}
            color="#1877F2"
            weight="duotone"
            className="group-hover:animate-shake"
          />
          Share on <strong>Facebook</strong>
        </FacebookShareButton>

        <LinkedinShareButton
          url={shareURL}
          title={title}
          className="group flex items-center gap-1 hover:underline"
        >
          <LinkedinLogo
            size={28}
            color="#0a66c2"
            weight="duotone"
            className="group-hover:animate-shake"
          />
          Share on <strong>Linkedin</strong>
        </LinkedinShareButton>
      </div>
    </Modal>
  );
}
