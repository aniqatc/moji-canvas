async function getStickerByCategory(metadata, category) {
  try {
    if (category === "all" || !category) {
      const stickers = metadata.filter((data) => data.group === category || data.group.startsWith(category));
      const randomIndex = Math.floor(Math.random() * stickers.length);
      return stickers[randomIndex];
    } else {
      const filteredStickers = metadata.filter((data) => data.group === category || data.group.startsWith(category));
      const randomIndex = Math.floor(Math.random() * filteredStickers.length);
      return filteredStickers[randomIndex];
    }
  } catch (error) {
    console.error('Error occurred while fetching sticker: ' + error.message);
  }
}

function generateRandomSize() {
  const size = Math.floor(Math.random() * 200 + 100);
  const rotation = Math.floor(Math.random() * 90 - 45) + 'deg';
  return {
    width: size + 'px',
    height: size + 'px',
    rotation
  };
}

export { getStickerByCategory, generateRandomSize };
