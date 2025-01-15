async function getStickerByCategory(metadata, category) {
  try {
    const filteredStickers = metadata.filter(
      (data) => !category || data.group === category || data.group.startsWith(category)
    );
    const randomIndex = Math.floor(Math.random() * filteredStickers.length);
    return filteredStickers[randomIndex];
  } catch (error) {
    console.error('Error occurred while fetching sticker: ' + error.message);
  }
}

function generateRandomSize() {
  const size = Math.floor(Math.random() * 200 + 100);
  return {
    width: size + 'px',
    height: size + 'px',
    rotation: Math.floor(Math.random() * 45 - 30) + 'deg',
  };
}

export { getStickerByCategory, generateRandomSize };
