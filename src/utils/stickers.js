async function getStickerByCategory(metadata, category) {
  try {
    if (category === 'all' || !category) {
      const stickers = metadata.filter(
        (data) => data.group === category || data.group.startsWith(category)
      );
      const randomIndex = Math.floor(Math.random() * stickers.length);
      return stickers[randomIndex];
    } else {
      const filteredStickers = metadata.filter(
        (data) => data.group === category || data.group.startsWith(category)
      );
      const randomIndex = Math.floor(Math.random() * filteredStickers.length);
      return filteredStickers[randomIndex];
    }
  } catch (error) {
    console.error('Error occurred while fetching sticker: ' + error.message);
  }
}

function generateRandomSizeAndPosition() {
  const size = Math.floor(Math.random() * 200 + 100);

  return {
    width: size + 'px',
    height: size + 'px',
    rotation: getPositiveOrNegativeValue() * Math.random() * 360 + 'deg',
    floatOffsets: {
      x: [
        getPositiveOrNegativeValue() * Math.random() * (window.innerWidth * 0.25),
        getPositiveOrNegativeValue() * Math.random() * (window.innerWidth * 0.25),
      ],
      y: [
        getPositiveOrNegativeValue() * Math.random() * (window.innerHeight * 0.25),
        getPositiveOrNegativeValue() * Math.random() * (window.innerHeight * 0.25),
      ],
    },
  };
}

function getPositiveOrNegativeValue() {
  return Math.random() > 0.5 ? -1 : 1;
}

export { getStickerByCategory, generateRandomSizeAndPosition };
