import { Modal } from '../reusable';

export default function InfoModal({ isOpen, onClose, stickerDesigners }) {
    const uniqueDesigners = [...new Set(stickerDesigners)];

    return (
        <Modal heading="About moji canvas" isOpen={isOpen} onClose={onClose}>
            <p className="text-gray-700 mb-2">An interactive emoji-based sticker canvas.</p>
            <h4 className="font-bold mb-1">Key Features</h4>
            <ul className="ml-3 list-disc text-xs mb-2">
                <li>
                    <strong>Add, remove and arrange </strong> stickers
                </li>
                <li>
                    <strong>Customize</strong> background and pattern colors
                </li>
                <li>
                    <strong>Animate</strong> stickers with floating, rotating and scaling options
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
            {uniqueDesigners && uniqueDesigners.length > 0 && <>
                <h4 className="font-bold mb-1">Featured OpenMoji Designers</h4>
                <ul className="mb-2 text-[11px] flex flex-wrap gap-x-2 gap-y-1 text-gray-600">
                    {uniqueDesigners.map(designer => (<li key={designer} className="px-1 py-0.5 border rounded">{designer}</li>))}
                </ul>
            </>}
            <h4 className="font-bold mb-1">Credits</h4>
            <span className="text-xs text-gray-600">
                <p>Coded and designed by: <a href="https://aniqa.dev" target="_blank"
                                             className="font-semibold underline hover:text-gray-900 transition-all">Aniqa</a></p>
                <p>Inspired by: <a href="https://www.joshwcomeau.com/" target="_blank"
                                   className="font-semibold underline hover:text-gray-900 transition-all">Josh Comeau</a></p>
                <p>Emoji stickers by: <a href="https://openmoji.org/" target="_blank"
                                         className="font-semibold underline hover:text-gray-900 transition-all">OpenMoji</a></p>
                <p>Icons: <a href="https://phosphoricons.com/" target="_blank"
                             className="font-semibold underline hover:text-gray-900 transition-all">Phosphor</a></p>
            </span>
        </Modal>
    )
}