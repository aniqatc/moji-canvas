import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, useDragControls } from 'framer-motion';
import { canvasAddMode, canvasRemoveMode, downloadImage } from './utils';
import { useMetadata, useLocalStorage, useAnimation, useKey } from './hooks';
import {
  Heading,
  ClickHintText,
  Toolbar,
  InfoModal,
  ShareModal,
  Sticker,
  CanvasBackground,
  Notification,
} from './components';
import { saveCanvasData, getCanvasData } from './data/supabase.js';
import { useUI } from './contexts';

function App() {
  const params = useParams();
  const [canvasId, setCanvasId] = useState(params.canvasId || null);

  const metadata = useMetadata();
  const controls = useDragControls();
  const constraintsRef = useRef(null);

  const { renderNotification, notificationType, showNotification, toggleShareModal } = useUI();
  const [isDragging, setIsDragging] = useState(false);
  const [stickerMode, setStickerMode] = useState('add');
  const [category, setCategory] = useState('');

  const [stickers, setStickers, saveStickers] = useLocalStorage('stickers', []);
  const [designers, setDesigners, saveDesigners] = useLocalStorage('designers', []);
  const [backgroundColor, setBackgroundColor, saveBackgroundColor] = useLocalStorage('bg-color', '#ffefef');
  const [dotColor, setDotColor, saveDotColor] = useLocalStorage('dot-color', '#ec1111');
  const [showInitialElements, setShowInitialElements] = useState(stickers.length === 0);

  const { animationProps, get, reset: resetAnimations } = useAnimation();
  const [scale, setScale, saveScale] = useLocalStorage('scale', 1);

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

    const savedId = await saveCanvasData(
      stickers,
      designers,
      backgroundColor,
      dotColor,
      scale,
      canvasId
    );
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
        setShowInitialElements(
          canvasRemoveMode(stickerDiv, stickers, setStickers, designers, setDesigners)
        );
      }
    }
  }

  return (
    <CanvasBackground
      ref={constraintsRef}
      onClick={handleCanvasClick}
      backgroundColor={backgroundColor}
      dotColor={dotColor}
    >
      <AnimatePresence>
        {showInitialElements && (
          <>
            <ClickHintText />
            <Heading />
          </>
        )}
        {stickers &&
          stickers.map((sticker) => {
            return (
              <Sticker
                key={`${sticker.id}-${get.animateMode}`}
                drag
                dragControls={controls}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(event, info) => {
                  setIsDragging(false);
                  setStickers((prev) =>
                    prev.map((s) =>
                      s.id === sticker.id
                        ? {
                            ...s,
                            translateX: (s.translateX || 0) + info.offset.x,
                            translateY: (s.translateY || 0) + info.offset.y,
                          }
                        : s
                    )
                  );
                }}
                whileDrag={{ cursor: 'grabbing' }}
                dragConstraints={constraintsRef}
                sticker={sticker}
                get={get}
                scale={scale}
              />
            );
          })}
      </AnimatePresence>
      <Toolbar
        animationProps={{ ...animationProps, stickerLength: stickers.length }}
        backgroundProps={{ backgroundColor, dotColor, setBackgroundColor, setDotColor }}
        onStickerMode={(mode) => setStickerMode(mode)}
        onThemeSelect={(theme) => setCategory(theme)}
        setScale={(value) => setScale(value)}
        scale={scale}
        onReset={handleReset}
        onSave={handleSave}
        onDownload={() => {
          downloadImage(constraintsRef);
          renderNotification('download');
        }}
        onShare={async () => {
          await handleSave();
          toggleShareModal();
        }}
        disableButton={showInitialElements || get.animateMode}
      />
      <InfoModal stickerDesigners={designers} />
      <ShareModal canvasId={canvasId} />
      {showNotification && (
        <AnimatePresence>
          <Notification key={notificationType} type={notificationType} />
        </AnimatePresence>
      )}
    </CanvasBackground>
  );
}

export default App;
