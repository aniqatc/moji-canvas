async function getStickerByCategory(metadata, category) {
  try {
    const stickers =
      category === 'all' || !category
        ? metadata
        : metadata.filter((data) => data.group === category || data.group.startsWith(category));

    const randomIndex = Math.floor(Math.random() * stickers.length);
    return stickers[randomIndex];
  } catch (error) {
    console.error('Error occurred while fetching sticker: ' + error.message);
  }
}

export { getStickerByCategory };
