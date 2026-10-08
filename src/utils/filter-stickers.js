function inCategory(entry, category) {
  return !category || category === 'all' || entry.group === category || entry.group.startsWith(category);
}

function getStickerByCategory(metadata, category) {
  const stickers = metadata.filter((entry) => inCategory(entry, category));
  return stickers[Math.floor(Math.random() * stickers.length)];
}

// Used by the sticker picker: matches the search text against each sticker's
// name and tags within the selected theme.
function filterStickers(metadata, category, query) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return metadata.filter((entry) => {
    if (!inCategory(entry, category)) return false;
    if (!terms.length) return true;
    const haystack = `${entry.annotation} ${entry.tags} ${entry.openmoji_tags}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

export { getStickerByCategory, filterStickers };
