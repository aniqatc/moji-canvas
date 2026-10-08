import { useState, useEffect, useContext, createContext } from 'react';
import { useParams } from 'react-router-dom';
import { getCanvasData, saveCanvasData } from '../data/supabase.js';
import { useAnimation, useKey, useLocalStorage, useMetadata } from '../hooks';
import {
  createSticker,
  getStickerByCategory,
  isInteractiveTarget,
  isTextEntryTarget,
  normalizeSticker,
  randomAnimation,
  ANIMATION_STICKER_LIMIT,
  MAX_STICKERS,
} from '../utils';
import { useUI } from './UIContext.jsx';

const CanvasContext = createContext();

const DEFAULT_BG = '#ffefef';
const DEFAULT_DOTS = '#ec1111';
const STORAGE_KEYS = ['stickers', 'designers', 'bg-color', 'dot-color', 'scale'];
const NUDGE = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };

const normalizeAll = (stickers) => (Array.isArray(stickers) ? stickers.map(normalizeSticker) : []);

export const CanvasProvider = ({ children }) => {
  const params = useParams();
  const [canvasId, setCanvasId] = useState(params.canvasId || null);

  const [isDragging, setIsDragging] = useState(false);
  const [stickerMode, setStickerMode] = useState('add');
  const [category, setCategory] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const metadata = useMetadata();
  const [stickers, setStickers, saveStickers] = useLocalStorage('stickers', [], normalizeAll);
  const [designers, setDesigners, saveDesigners] = useLocalStorage('designers', []);
  const [backgroundColor, setBackgroundColor, saveBackgroundColor] = useLocalStorage('bg-color', DEFAULT_BG);
  const [dotColor, setDotColor, saveDotColor] = useLocalStorage('dot-color', DEFAULT_DOTS);
  const [scale, setScale, saveScale] = useLocalStorage('scale', 1);
  const [showInitialElements, setShowInitialElements] = useState(stickers.length === 0);

  const { animationProps, reset: resetAnimations } = useAnimation();
  const { playing, setPlaying } = animationProps;
  const { renderNotification } = useUI();

  const selectedSticker = stickers.find((sticker) => sticker.id === selectedId) || null;
  const isOverAnimationLimit = stickers.length > ANIMATION_STICKER_LIMIT;

  // Pause motion on crowded canvases (done in an effect, not during render).
  useEffect(() => {
    if (isOverAnimationLimit && playing) setPlaying(false);
  }, [isOverAnimationLimit, playing, setPlaying]);

  // ---- Keyboard ----
  useKey(['Enter', ' '], (event) => {
    if (isInteractiveTarget(event.target)) return;
    event.preventDefault();
    handleCanvasClick(event);
  });

  useKey(['Delete', 'Backspace'], (event) => {
    if (!selectedId || isTextEntryTarget(event.target)) return;
    event.preventDefault();
    removeSticker(selectedId);
  });

  useKey('Escape', () => setSelectedId(null));

  useKey(Object.keys(NUDGE), (event) => {
    if (!selectedId || isTextEntryTarget(event.target)) return;
    event.preventDefault();
    const step = event.shiftKey ? 20 : 4;
    const [dx, dy] = NUDGE[event.key];
    nudgeSticker(selectedId, dx * step, dy * step);
  });

  // ---- Shared canvases ----
  useEffect(() => {
    async function fetchExistingCanvas() {
      if (canvasId) {
        try {
          const data = await getCanvasData(canvasId);
          if (data) {
            const loaded = normalizeAll(data.stickers);
            setDesigners(data.designers || []);
            setStickers(loaded);
            setBackgroundColor(data.backgroundColor || DEFAULT_BG);
            setDotColor(data.dotColor || DEFAULT_DOTS);
            setScale(data.scale ?? 1);
            setSelectedId(null);
            setShowInitialElements(loaded.length === 0);
            renderNotification('loadSuccess');
          }
        } catch (error) {
          clearCanvas();
          renderNotification('notFound');

          // invalid canvasId in params
          if (error.code === '22P02') {
            setCanvasId(null);
          }
        }
      }
    }
    fetchExistingCanvas();
    // Only refetch when the URL changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.canvasId]);

  function saveLocally() {
    saveStickers();
    saveDesigners();
    saveDotColor();
    saveBackgroundColor();
    saveScale();
  }

  async function handleSave() {
    saveLocally();
    renderNotification('save');

    if (canvasId) {
      try {
        const savedId = await saveCanvasData(stickers, designers, backgroundColor, dotColor, scale, canvasId);
        setCanvasId(savedId);
      } catch {
        renderNotification('saveError');
      }
    }
  }

  async function handleShare() {
    saveLocally();
    renderNotification('share');

    try {
      const savedId = await saveCanvasData(stickers, designers, backgroundColor, dotColor, scale, canvasId);
      setCanvasId(savedId);
    } catch {
      renderNotification('saveError');
    }
  }

  async function handleReset() {
    try {
      STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    } catch {
      // Storage unavailable; nothing to clear.
    }
    clearCanvas();
    renderNotification('reset');

    // Only a canvas that already has a share link is cleared in the database.
    if (canvasId) {
      try {
        await saveCanvasData([], [], DEFAULT_BG, DEFAULT_DOTS, 1, canvasId);
      } catch {
        renderNotification('saveError');
      }
    }
  }

  function clearCanvas() {
    setShowInitialElements(true);
    setStickerMode('add');
    setSelectedId(null);
    setDesigners([]);
    setStickers([]);
    setBackgroundColor(DEFAULT_BG);
    setDotColor(DEFAULT_DOTS);
    setScale(1);
    resetAnimations();
  }

  // ---- Sticker actions ----
  function addSticker(metadataEntry, event = null) {
    if (!metadataEntry) return null;
    if (stickers.length >= MAX_STICKERS) {
      renderNotification('limit');
      return null;
    }
    const sticker = createSticker(metadataEntry, event);
    setShowInitialElements(false);
    setStickers((prev) => [...prev, sticker]);
    setDesigners((prev) => [...prev, sticker.openmoji_author]);
    return sticker;
  }

  function updateSticker(id, changes) {
    setStickers((prev) => prev.map((sticker) => (sticker.id === id ? { ...sticker, ...changes } : sticker)));
  }

  function nudgeSticker(id, dx, dy) {
    setStickers((prev) =>
      prev.map((sticker) =>
        sticker.id === id
          ? { ...sticker, translateX: sticker.translateX + dx, translateY: sticker.translateY + dy }
          : sticker
      )
    );
  }

  function removeSticker(id) {
    const target = stickers.find((sticker) => sticker.id === id);
    if (!target) return;

    const remaining = stickers.filter((sticker) => sticker.id !== id);
    setStickers(remaining);
    setDesigners((prev) => {
      const index = prev.indexOf(target.openmoji_author);
      if (index === -1) return prev;
      const next = [...prev];
      next.splice(index, 1); // remove only one occurrence
      return next;
    });
    if (selectedId === id) setSelectedId(null);
    if (remaining.length === 0) setShowInitialElements(true);
  }

  function duplicateSticker(id) {
    const source = stickers.find((sticker) => sticker.id === id);
    if (!source) return;
    if (stickers.length >= MAX_STICKERS) {
      renderNotification('limit');
      return;
    }
    const copy = {
      ...source,
      id: `${Date.now()}${source.hexcode}`,
      translateX: source.translateX + 24,
      translateY: source.translateY + 24,
    };
    setStickers((prev) => [...prev, copy]);
    setDesigners((prev) => [...prev, copy.openmoji_author]);
    setSelectedId(copy.id);
  }

  function bringToFront(id) {
    setStickers((prev) => {
      const target = prev.find((sticker) => sticker.id === id);
      return target ? [...prev.filter((sticker) => sticker.id !== id), target] : prev;
    });
  }

  function shuffleAnimations() {
    setStickers((prev) => prev.map((sticker) => ({ ...sticker, animation: randomAnimation() })));
    if (!isOverAnimationLimit) setPlaying(true);
  }

  function togglePlaying() {
    if (isOverAnimationLimit) return;
    setPlaying((prev) => !prev);
  }

  // Clicking (or Enter on) a sticker selects it, or removes it in remove mode.
  function handleStickerActivate(id) {
    if (stickerMode === 'remove') {
      removeSticker(id);
    } else {
      setSelectedId(id);
    }
  }

  function handleCanvasClick(event) {
    if (isDragging) return;

    const stickerDiv = event.target.closest?.('.sticker-div');
    if (stickerDiv) {
      handleStickerActivate(stickerDiv.id);
      return;
    }
    if (stickerMode !== 'add') return;

    // First click on empty canvas just closes the sticker panel.
    if (selectedId) {
      setSelectedId(null);
      return;
    }

    setShowInitialElements(false);
    if (stickers.length >= MAX_STICKERS) {
      renderNotification('limit');
      return;
    }
    if (metadata) {
      addSticker(getStickerByCategory(metadata, category), event);
    }
  }

  const context = {
    handleSave,
    handleShare,
    handleCanvasClick,
    handleReset,
    handleStickerActivate,
    clearCanvas,
    addSticker,
    updateSticker,
    removeSticker,
    duplicateSticker,
    bringToFront,
    shuffleAnimations,
    togglePlaying,
    setCanvasId,
    setStickers,
    setDesigners,
    setScale,
    setBackgroundColor,
    setCategory,
    setStickerMode,
    setDotColor,
    setIsDragging,
    setSelectedId,
    canvasId,
    metadata,
    stickers,
    designers,
    scale,
    backgroundColor,
    category,
    stickerMode,
    dotColor,
    isDragging,
    selectedId,
    selectedSticker,
    isOverAnimationLimit,
    animationProps,
    showInitialElements,
    setShowInitialElements,
  };

  return <CanvasContext.Provider value={context}>{children}</CanvasContext.Provider>;
};

export const useCanvas = () => useContext(CanvasContext);
