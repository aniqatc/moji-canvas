import { useState, useRef } from 'react';
import { AnimatePresence, useDragControls } from 'framer-motion';
import { Heading, ClickHintText, Toolbar, InfoModal, ShareModal, Sticker, CanvasBackground } from './components';
import { canvasAddMode, canvasRemoveMode, downloadImage } from './utils';
import { useMetadata, useModal, useLocalStorage, useAnimation } from './hooks';

function App() {
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

  function handleSave() {
    saveStickers();
    saveDesigners();
    saveDotColor();
    saveBackgroundColor();
  }

  function handleReset() {
    localStorage.clear();
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
        onDownload={() => downloadImage(constraintsRef)}
        onShare={toggleShareModal}
        openModal={toggleInfoModal}
        disableButton={showInitialElements || get.animateMode}
      />
      <InfoModal isOpen={infoModalOpen} onClose={toggleInfoModal} stickerDesigners={designers} />
      <ShareModal isOpen={shareModalOpen} onClose={toggleShareModal} />
    </CanvasBackground>
  );
}

export default App;
