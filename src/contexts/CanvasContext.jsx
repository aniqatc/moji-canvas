import { useState, useEffect, useContext, createContext } from 'react';
import { useParams } from 'react-router-dom';
import { getCanvasData, saveCanvasData } from '../data/supabase.js';
import { useAnimation, useKey, useLocalStorage, useMetadata } from '../hooks';
import { canvasAddMode, canvasRemoveMode } from '../utils';
import { useUI } from './UIContext.jsx';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const params = useParams();
  const [canvasId, setCanvasId] = useState(params.canvasId || null);

  const [isDragging, setIsDragging] = useState(false);
  const [stickerMode, setStickerMode] = useState('add');
  const [category, setCategory] = useState('');

  const metadata = useMetadata();
  const [stickers, setStickers, saveStickers] = useLocalStorage('stickers', []);
  const [designers, setDesigners, saveDesigners] = useLocalStorage('designers', []);
  const [backgroundColor, setBackgroundColor, saveBackgroundColor] = useLocalStorage('bg-color', '#ffefef');
  const [dotColor, setDotColor, saveDotColor] = useLocalStorage('dot-color', '#ec1111');
  const [scale, setScale, saveScale] = useLocalStorage('scale', 1);
  const [showInitialElements, setShowInitialElements] = useState(stickers.length === 0);

  const { animationProps, reset: resetAnimations } = useAnimation();
  const { renderNotification } = useUI();

  useKey('Enter', handleCanvasClick);
  useKey(' ', handleCanvasClick);
  useKey('Backspace', handleReset);

  useEffect(() => {
    async function fetchExistingCanvas() {
      if (canvasId) {
        try {
          const data = await getCanvasData(canvasId);
          if (data) {
            setDesigners(data.designers);
            setStickers(data.stickers);
            setBackgroundColor(data.backgroundColor);
            setDotColor(data.dotColor);
            setScale(data.scale);
            setShowInitialElements(!data.stickers.length > 0);
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
  }, [canvasId]);

  async function handleSave() {
    saveStickers();
    saveDesigners();
    saveDotColor();
    saveBackgroundColor();
    saveScale();
    renderNotification('save');

    if (canvasId) {
      const savedId = await saveCanvasData(stickers, designers, backgroundColor, dotColor, scale, canvasId);
      setCanvasId(savedId);
    }
  }

  async function handleShare() {
    saveStickers();
    saveDesigners();
    saveDotColor();
    saveBackgroundColor();
    saveScale();
    renderNotification('share');

    const savedId = await saveCanvasData(stickers, designers, backgroundColor, dotColor, scale, canvasId);
    setCanvasId(savedId);
  }

  async function handleReset() {
    localStorage.clear();
    clearCanvas();
    renderNotification('reset');

    const savedId = await saveCanvasData([], [], '#ffefef', '#ec1111', 1, canvasId);
    setCanvasId(savedId);
  }

  function clearCanvas() {
    setShowInitialElements(true);
    setStickerMode('add');
    setDesigners([]);
    setStickers([]);
    setBackgroundColor('#ffefef');
    setDotColor('#ec1111');
    setScale(1);
    resetAnimations();
  }

  async function handleCanvasClick(event) {
    if (isDragging) return;
    if (stickerMode === 'add') {
      setShowInitialElements(false);
      await canvasAddMode(event, metadata, category, setStickers, setDesigners);
    }
    if (stickerMode === 'remove') {
      const stickerDiv = event.target.closest('.sticker-div');
      if (stickerDiv) {
        setShowInitialElements(canvasRemoveMode(stickerDiv, stickers, setStickers, designers, setDesigners));
      }
    }
  }

  const context = {
    handleSave,
    handleShare,
    handleCanvasClick,
    handleReset,
    clearCanvas,
    setCanvasId,
    setStickers,
    setDesigners,
    setScale,
    setBackgroundColor,
    setCategory,
    setStickerMode,
    setDotColor,
    setIsDragging,
    canvasId,
    stickers,
    designers,
    scale,
    backgroundColor,
    category,
    stickerMode,
    dotColor,
    isDragging,
    animationProps,
    showInitialElements,
    setShowInitialElements,
  };

  return <CanvasContext.Provider value={context}>{children}</CanvasContext.Provider>;
};

export const useCanvas = () => useContext(CanvasContext);
