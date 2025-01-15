import { Modal } from '../reusable';

export default function InfoModal({ isOpen, onClose, stickerDesigners }) {
  const uniqueDesigners = [...new Set(stickerDesigners)];

  return (
    <Modal heading="About Moji Canvas" isOpen={isOpen} onClose={onClose}>
      <p className="mb-2 text-gray-700">An interactive emoji-based sticker canvas.</p>
      <h4 className="mb-1 font-bold">Key Features</h4>
      <ul className="mb-2 ml-3 list-disc text-xs">
        <li>
          <strong>Add, remove and arrange </strong> stickers
        </li>
        <li>
          <strong>4000+ illustrations</strong> across <em>10 unique themes</em>
        </li>
        <li>
          <strong>Customize</strong> background and pattern colors
        </li>
        <li>
          <strong>Animate</strong> stickers with <em>floating, rotating and scaling options</em>
        </li>
        <li>
          <strong>Save</strong> your creation for next time or <strong>download</strong> as an image
        </li>
        <li>
          <strong>Share</strong> moji canvas with your friends
        </li>
        <li>
          Working seamlessly across <strong>different devices</strong>
        </li>
      </ul>
      {uniqueDesigners && uniqueDesigners.length > 0 && (
        <>
          <h4 className="mb-1 font-bold">Featured OpenMoji Designers</h4>
          <ul className="mb-2 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-gray-600">
            {uniqueDesigners.map((designer) => (
              <li key={designer} className="rounded border px-1 py-0.5">
                {designer}
              </li>
            ))}
          </ul>
        </>
      )}
      <h4 className="mb-1 font-bold">Credits</h4>
      <span className="text-xs text-gray-600">
        <p>
          Coded and designed by:{' '}
          <a
            href="https://aniqa.dev"
            target="_blank"
            className="font-semibold underline transition-all hover:text-gray-900"
          >
            Aniqa
          </a>
        </p>
        <p>
          Inspired by:{' '}
          <a
            href="https://www.joshwcomeau.com/"
            target="_blank"
            className="font-semibold underline transition-all hover:text-gray-900"
          >
            Josh Comeau
          </a>
        </p>
        <p>
          Emoji stickers by:{' '}
          <a
            href="https://openmoji.org/"
            target="_blank"
            className="font-semibold underline transition-all hover:text-gray-900"
          >
            OpenMoji
          </a>
        </p>
        <p>
          Icons:{' '}
          <a
            href="https://phosphoricons.com/"
            target="_blank"
            className="font-semibold underline transition-all hover:text-gray-900"
          >
            Phosphor
          </a>
        </p>
      </span>
    </Modal>
  );
}
