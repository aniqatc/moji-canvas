import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { Heading, ClickHintText, Toolbar } from './components';
import { getStickerByCategory, generateRandomSizeAndPosition } from './utils/stickers.js';

function App() {
  const controls = useDragControls();
  const constraintsRef = useRef(null);

  const [metadata, setMetadata] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [stickerMode, setStickerMode] = useState('add');
  const [showInitialElements, setShowInitialElements] = useState(!localStorage.getItem('stickers'));
  const [backgroundColor, setBackgroundColor] = useState('#ffefef');
  const [dotColor, setDotColor] = useState('#ec1111');
  const [stickers, setStickers] = useState(() => JSON.parse(localStorage.getItem('stickers')) || []);
  const [category, setCategory] = useState('');
  const [scale, setScale] = useState(1);

  const [animateMode, setAnimateMode] = useState(false);
  const [float, setFloat] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    async function getMetadata() {
      const response = await fetch(`/data/metadata.json`);
      const data = await response.json();
      setMetadata(data);
    }
    getMetadata();
  }, []);

  async function handleCanvasClick(e) {
    if (isDragging) return;

    const nonCanvasEl = document.querySelectorAll(
      'aside, header, [data-radix-popper-content-wrapper]'
    );
    if ([...nonCanvasEl].some((el) => el?.contains(e.target))) return;

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
    } else if (stickerMode === 'remove') {
      const stickerDiv = e.target.closest('.sticker-div');
      if (stickerDiv) {
        const updatedStickers = stickers.filter((sticker) => sticker.id !== stickerDiv.id);
        setStickers(updatedStickers);

        if (updatedStickers.length === 0) {
          setShowInitialElements(true);
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
              <Heading />
            </motion.div>
          </>
        )}
        {stickers &&
          stickers.map((sticker) => (
            <motion.div
              className="sticker-div"
              id={sticker.id}
              key={`${sticker.id}-${animateMode}`}
              style={{
                position: 'absolute',
                top: sticker.top,
                left: sticker.left,
                width: sticker.width,
                height: sticker.height,
                cursor: 'grab',
                filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5))',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              drag
              dragControls={controls}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              whileDrag={{ cursor: 'grabbing' }}
              dragConstraints={constraintsRef}
            >
              <motion.div
                key={speed}
                animate={
                  animateMode && float
                    ? {
                        y: sticker.floatOffsets.y,
                        x: sticker.floatOffsets.x,
                      }
                    : { y: 0, x: 0 }
                }
                transition={{
                  y: {
                    duration: 2 / speed,
                    repeat: float ? Infinity : 0,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                  x: {
                    duration: 2 / speed,
                    repeat: float ? Infinity : 0,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                }}
              >
                <motion.div
                  key={speed}
                  initial={{ rotate: sticker.rotation }}
                  animate={
                    animateMode && rotate
                      ? {
                          rotate: [0, parseInt(sticker.rotation) + 100],
                        }
                      : { rotate: sticker.rotation }
                  }
                  transition={{
                    duration: 2 / speed,
                    repeat: rotate ? Infinity : 0,
                    repeatType: 'reverse',
                    ease: 'linear',
                  }}
                >
                  <img
                    src={sticker.src}
                    alt={sticker.annotation}
                    style={{
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none',
                      transform: `scale(${scale})`,
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
      </AnimatePresence>
      <Toolbar
        animationProps={{
          animateMode,
          float,
          rotate,
          speed,
          setRotate,
          setFloat,
          setSpeed,
          setAnimateMode,
          stickerLength: stickers.length,
        }}
        backgroundProps={{ backgroundColor, dotColor, setBackgroundColor, setDotColor }}
        onStickerMode={(mode) => setStickerMode(mode)}
        onThemeSelect={(theme) => setCategory(theme)}
        onScaleChange={(value) => setScale(value)}
        onReset={() => {
          setStickers([]);
          localStorage.removeItem("stickers");
          setShowInitialElements(true);
          setSpeed(1);
          setScale(1);
          setAnimateMode(false);
          setRotate(false);
          setFloat(false);
          setStickerMode('add');
        }}
        onSave={() => {
          localStorage.setItem('stickers', JSON.stringify(stickers));
        }}
        onShare={() => {}}
      />
    </main>
  );
}

export default App;
