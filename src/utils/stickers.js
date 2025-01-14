async function getStickerByCategory(category) {
    try {
        const response = await fetch('../src/data/metadata.json');
        const metadata = await response.json();

        const filteredStickers = metadata.filter(data => !category || data.group === category || data.group.startsWith(category));
        const randomIndex = Math.floor(Math.random() * filteredStickers.length);
        const sticker = filteredStickers[randomIndex];

        const svg = await import (`../assets/stickers/${sticker.hexcode}.svg`);
        return {
            ...sticker,
            src: svg.default
        }
    } catch (error) {
        console.error('getStickerByCategory error: ' + error.message);
    }
}

export { getStickerByCategory };