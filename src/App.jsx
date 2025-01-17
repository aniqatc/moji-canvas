import { useState, useRef } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import {Heading, ClickHintText, Toolbar, InfoModal, ShareModal, Sticker } from './components';
import { getStickerByCategory, generateRandomSizeAndPosition, downloadImage } from './utils';
import { useMetadata, useModal, useLocalStorage, useAnimation } from './hooks';

function App() {
  const [showInitialElements, setShowInitialElements] = useState(() => {
    const savedStickers = localStorage.getItem('stickers');
    return !savedStickers || JSON.parse(savedStickers).length === 0;
  });

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

  async function handleCanvasClick(e) {
    if (isDragging) return;

    if (stickerMode === 'add') {
      setShowInitialElements(false);
      const sticker = await getStickerByCategory(metadata, category);
      const { width, rotation, height, floatOffsets } = generateRandomSizeAndPosition();
      const stickerWithStyles = {
        ...sticker,
        src: `/stickers/${sticker.hexcode}.svg`,
        id: Date.now() + sticker.hexcode,
        height,
        width,
        rotation,
        floatOffsets,
        top: e.clientY - parseInt(height) / 2 + 'px',
        left: e.clientX - parseInt(width) / 2 + 'px',
      };
      setStickers((prev) => [...prev, stickerWithStyles]);
      setDesigners((prev) => [...prev, stickerWithStyles.openmoji_author]);
    } else if (stickerMode === 'remove') {
      const stickerDiv = e.target.closest('.sticker-div');
      if (stickerDiv) {
        const stickerToRemove = stickers.find(sticker => sticker.id === stickerDiv.id);
        if (stickerToRemove) {
          const updatedStickers = stickers.filter(sticker => sticker.id !== stickerDiv.id);
          setStickers(updatedStickers);

          // only remove the first instance of the designer name
          const updatedDesigners = [...designers];
          updatedDesigners.splice(designers.indexOf(stickerToRemove.openmoji_author), 1);
          setDesigners(updatedDesigners);

          if (updatedStickers.length === 0) {
            setShowInitialElements(true);
          }
        }
      }
    }
  }

  return (
    <main
      ref={constraintsRef}
      onClick={handleCanvasClick}
      className="relative mx-auto flex h-dvh min-h-screen w-full cursor-pointer flex-col items-center justify-center gap-5 w-xs:justify-normal"
      style={{
        backgroundColor: backgroundColor,
        backgroundImage: `radial-gradient(${dotColor} 2px, transparent 2px), 
                           radial-gradient(${dotColor} 2px, ${backgroundColor} 2px)`,
        backgroundSize: '100px 100px',
        backgroundPosition: '0 0, 50px 50px',
        '--accent-maroon': `color-mix(in srgb, ${dotColor}, #540F0F)`,
        '--muted': `color-mix(in srgb, ${dotColor}, #000000 50%)`,
        '--highlight': `color-mix(in srgb, ${backgroundColor}, rgba(0,0,0,0.1))`,
      }}
    >
      <AnimatePresence>
        {showInitialElements && (
          <>
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.2 }}
            >
              <ClickHintText />
            </motion.div>
            <motion.div
              initial={{ opacity: 1, pointerEvents: 'auto' }}
              exit={{ opacity: 0, y: -30, pointerEvents: 'none' }}
              transition={{
                initial: { delay: 0.3, duration: 0.3 },
                exit: { duration: 0.3 },
              }}
            >
              <Heading openModal={toggleInfoModal} />
            </motion.div>
          </>
        )}
        {stickers &&
          stickers.map((sticker) => {
            return <Sticker key={`${sticker.id}-${get.animateMode}`}
                            drag
                            dragControls={controls}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={() => setIsDragging(false)}
                            whileDrag={{ cursor: 'grabbing' }}
                            dragConstraints={constraintsRef}
                            sticker={sticker}
                            get={get} />
          })}
      </AnimatePresence>
      <Toolbar
        animationProps={{
          ...animationProps,
          stickerLength: stickers.length,
        }}
        backgroundProps={{ backgroundColor, dotColor, setBackgroundColor, setDotColor }}
        onStickerMode={(mode) => setStickerMode(mode)}
        onThemeSelect={(theme) => setCategory(theme)}
        onScaleChange={(value) => setters.setScale(value)}
        onReset={() => {
          localStorage.clear();
          setShowInitialElements(true);
          setStickerMode('add');
          setDesigners([]);
          setStickers([]);
          setBackgroundColor('#ffefef');
          setDotColor('#ec1111');
          resetAnimations();
        }}
        onSave={() => {
          saveStickers();
          saveDesigners();
          saveDotColor();
          saveBackgroundColor();
        }}
        onDownload={() => {
          downloadImage(constraintsRef);
        }}
        onShare={toggleShareModal}
        openModal={toggleInfoModal}
        disableButton={showInitialElements || get.animateMode}
      />
      <InfoModal
        isOpen={infoModalOpen}
        onClose={toggleInfoModal}
        stickerDesigners={designers}
      />
      <ShareModal
          isOpen={shareModalOpen}
          onClose={toggleShareModal} />
    </main>
  );
}

export default App;
