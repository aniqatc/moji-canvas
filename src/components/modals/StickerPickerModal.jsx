import { useMemo, useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Modal } from '../reusable';
import { useCanvas, useUI } from '../../contexts';
import { themes } from '../../assets/themes';
import { filterStickers } from '../../utils';

const RESULT_LIMIT = 120;

// Lets people choose a specific sticker instead of a random one.
export default function StickerPickerModal() {
  const { pickerOpen, togglePicker } = useUI();
  const { metadata, category, addSticker, setSelectedId, setStickerMode } = useCanvas();
  const [query, setQuery] = useState('');

  const theme = themes.find((t) => t.value === (category || 'all')) || themes[0];

  const matches = useMemo(
    () => (metadata && pickerOpen ? filterStickers(metadata, category, query) : []),
    [metadata, category, query, pickerOpen]
  );
  const shown = matches.slice(0, RESULT_LIMIT);

  function handlePick(entry) {
    const sticker = addSticker(entry);
    if (sticker) {
      setStickerMode('add');
      setSelectedId(sticker.id);
    }
    togglePicker();
  }

  return (
    <Modal heading="Pick a sticker" isOpen={pickerOpen} onClose={togglePicker}>
      <label htmlFor="sticker-search" className="sr-only">
        Search stickers
      </label>
      <div className="mb-2 flex items-center gap-2 rounded border border-stone-300 bg-white px-2 focus-within:border-stone-500">
        <MagnifyingGlass size={18} className="text-gray-500" />
        <input
          id="sticker-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search: bee, pizza, rocket…"
          autoComplete="off"
          className="h-9 min-w-0 flex-1 bg-transparent outline-none"
        />
      </div>
      <p className="mb-2 flex items-center gap-1 text-[11px] text-gray-500">
        <img src={theme.icon} alt="" className="size-5" />
        <span>
          {metadata
            ? `${matches.length.toLocaleString()} in ${theme.label}${matches.length > RESULT_LIMIT ? `, showing the first ${RESULT_LIMIT}` : ''}`
            : 'Loading stickers…'}
        </span>
      </p>
      {metadata && matches.length === 0 ? (
        <p className="py-8 text-center text-gray-500">
          No stickers match “{query}”. Try another word or switch the theme to All.
        </p>
      ) : (
        <ul className="custom-scrollbar grid max-h-[50dvh] grid-cols-6 gap-1 overflow-y-auto pr-1 sm:grid-cols-8">
          {shown.map((entry) => (
            <li key={entry.hexcode}>
              <button
                type="button"
                onClick={() => handlePick(entry)}
                title={entry.annotation}
                aria-label={`Add ${entry.annotation}`}
                className="aspect-square w-full rounded p-1 transition-all hover:scale-110 hover:bg-active-gray active:scale-95"
              >
                <img src={`/stickers/${entry.hexcode}.svg`} alt="" loading="lazy" className="size-full" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
