import { generateRandomSizeAndPosition, getStickerByCategory } from "./stickers.js";

async function canvasAddMode(event, metadata, category, setStickers, setDesigners) {
    const sticker = await getStickerByCategory(metadata, category);
    const computedSizes = generateRandomSizeAndPosition();

    const stickerWithStyles = {
        ...sticker,
        src: `/stickers/${sticker.hexcode}.svg`,
        id: Date.now() + sticker.hexcode,
        height: computedSizes.height,
        width: computedSizes.width,
        rotation: computedSizes.rotation,
        floatOffsets: computedSizes.floatOffsets,
        top: event.clientY - parseInt(computedSizes.height) / 2 + 'px',
        left: event.clientX - parseInt(computedSizes.width) / 2 + 'px',
    };

    setStickers((prev) => [...prev, stickerWithStyles]);
    setDesigners((prev) => [...prev, stickerWithStyles.openmoji_author]);
}

function canvasRemoveMode(stickerDiv, stickers, setStickers, designers, setDesigners) {
    const stickerToRemove = stickers.find((sticker) => sticker.id === stickerDiv.id);
    if (stickerToRemove) {
        const updatedStickers = stickers.filter((sticker) => sticker.id !== stickerDiv.id);
        setStickers(updatedStickers);

        // only remove the first instance of the designer name
        const updatedDesigners = [...designers];
        updatedDesigners.splice(designers.indexOf(stickerToRemove.openmoji_author), 1);
        setDesigners(updatedDesigners);

        return updatedStickers.length === 0;
    }
    return false;
}

export { canvasAddMode, canvasRemoveMode };