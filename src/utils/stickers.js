async function getRandomSticker() {
    try {
        const response = await fetch('../src/data/metadata.json');
        const metadata = await response.json();

        const sticker = metadata[Math.round(Math.random() + metadata.length - 1)];
        const svg = await import (`../assets/stickers/${sticker.hexcode}.svg`);

        return {
            ...sticker,
            src: svg.default
        }
    } catch (error) {
        console.error('getRandomSticker error: ' + error.message);
    }
}

async function getStickerByCategory(category) {
    try {
        const response = await fetch('../src/data/metadata.json');
        const metadata = await response.json();

        const filteredStickers = metadata.filter(data => data.group === category || data.group.startsWith(category));
        const sticker = filteredStickers[Math.round(Math.random() + filteredStickers.length - 1)];

        const svg = await import (`../assets/stickers/${sticker.hexcode}.svg`);
        return {
            ...sticker,
            src: svg.default
        }
    } catch (error) {
        console.error('getStickerByCategory error: ' + error.message);
    }
}

export { getStickerByCategory, getRandomSticker };