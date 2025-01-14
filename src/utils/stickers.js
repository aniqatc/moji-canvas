async function getStickerByCategory(category) {
    try {
        const response = await fetch('/data/metadata.json');
        const metadata = await response.json();

        const filteredStickers = metadata.filter(data => !category || data.group === category || data.group.startsWith(category));
        const randomIndex = Math.floor(Math.random() * filteredStickers.length);
        const sticker = filteredStickers[randomIndex];

        const svg = await fetch(`/stickers/${sticker.hexcode}.svg`);
        return {
            ...sticker,
            src: svg.url
        }
    } catch (error) {
        console.error('getStickerByCategory error: ' + error.message);
    }
}

function generateRandomSize() {
    const size = Math.floor(Math.random() * 300 + 100);

    return {
        width: size + 'px',
        height: size + 'px',
        rotation: Math.floor(Math.random() * 45 - 30) + 'deg',
    }
}

export { getStickerByCategory, generateRandomSize };