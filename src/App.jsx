import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, useDragControls } from 'framer-motion';
import { canvasAddMode, canvasRemoveMode, downloadImage } from './utils';
import { useMetadata, useModal, useLocalStorage, useAnimation } from './hooks';
import {
  Heading,
  ClickHintText,
  Toolbar,
  InfoModal,
  ShareModal,
  Sticker,
  CanvasBackground,
  Notification
} from './components';
import { saveCanvasData, getCanvasData } from "./data/supabase.js";

function App() {
  const [canvasId, setCanvasId] = useState(useParams().canvasId || null);

  const metadata = useMetadata();
  const [infoModalOpen, toggleInfoModal] = useModal(false);
  const [shareModalOpen, toggleShareModal] = useModal(false);

  const controls = useDragControls();
  const constraintsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [stickerMode, setStickerMode] = useState('add');
  const [category, setCategory] = useState('');

  const [stickers, setStickers, saveStickers] = useLocalStorage('stickers', []);
  const [designers, setDesigners, saveDesigners] = useLocalStorage('designers', []);
  const [backgroundColor, setBackgroundColor, saveBackgroundColor] = useLocalStorage('bg-color', '#ffefef');
  const [dotColor, setDotColor, saveDotColor] = useLocalStorage('dot-color', '#ec1111');
  const { animationProps, get, setters, reset: resetAnimations } = useAnimation();
  const [showInitialElements, setShowInitialElements] = useState(stickers.length === 0);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');

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
            setShowInitialElements(!data.stickers.length > 0);
          }
        } catch (error) {
          clearCanvas();
          setShowNotification(true);
          setNotificationType('error');

          // invalid canvasId in params
          if (error.code === '22P02') {
            setCanvasId(null);
          }
        }
      }
    }
    fetchExistingCanvas();
  }, [canvasId])

  useEffect(() => {
    if (showNotification) {
      const timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, 3000)

      return () => {
        clearTimeout(timeoutId);
      }
    }
  }, [showNotification, notificationType]);

  async function handleSave() {
    saveStickers();
    saveDesigners();
    saveDotColor();
    saveBackgroundColor();
    setShowNotification(true);
    setNotificationType('save');

    const savedId = await saveCanvasData(stickers, designers, backgroundColor, dotColor, canvasId);
    setCanvasId(savedId);
  }

  async function handleReset() {
    localStorage.clear();
    clearCanvas();
    setShowNotification(true);
    setNotificationType('reset');

    const savedId = await saveCanvasData([], [], '#ffefef', '#ec1111', canvasId);
    setCanvasId(savedId);
  }

  function clearCanvas() {
    setShowInitialElements(true);
    setStickerMode('add');
    setDesigners([]);
    setStickers([]);
    setBackgroundColor('#ffefef');
    setDotColor('#ec1111');
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
            <Heading openModal={toggleInfoModal} />
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
                onDragEnd={() => setIsDragging(false)}
                whileDrag={{ cursor: 'grabbing' }}
                dragConstraints={constraintsRef}
                sticker={sticker}
                get={get}
              />
            );
          })}
      </AnimatePresence>
      <Toolbar
        animationProps={{ ...animationProps, stickerLength: stickers.length }}
        backgroundProps={{ backgroundColor, dotColor, setBackgroundColor, setDotColor }}
        onStickerMode={(mode) => setStickerMode(mode)}
        onThemeSelect={(theme) => setCategory(theme)}
        onScaleChange={(value) => setters.setScale(value)}
        onReset={handleReset}
        onSave={handleSave}
        onDownload={() => {
          downloadImage(constraintsRef);
          setShowNotification(true);
          setNotificationType('download');
        }}
        onShare={async () => {
          await handleSave();
          toggleShareModal();
        }}
        openModal={toggleInfoModal}
        disableButton={showInitialElements || get.animateMode}
      />
      <InfoModal isOpen={infoModalOpen} onClose={toggleInfoModal} stickerDesigners={designers} />
      <ShareModal isOpen={shareModalOpen} onClose={toggleShareModal} canvasId={canvasId} />
      {showNotification && (<AnimatePresence>
        <Notification key={notificationType} type={notificationType} />
      </AnimatePresence>)}
    </CanvasBackground>
  );
}

export default App;
