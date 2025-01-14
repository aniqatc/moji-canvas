import { useState } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { Heading, ClickHintText, Toolbar } from './components';
import { getStickerByCategory, generateRandomSize } from "./utils/stickers.js";

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#ffefef');
  const [dotColor, setDotColor] = useState('#ec1111');
  const [showInitialElements, setShowInitialElements] = useState(true);
  const [stickers, setStickers] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const controls = useDragControls();

    async function handleCanvasClick(e) {
      if (isDragging) return;

      const forbidden = document.querySelectorAll('aside, header');
      if ([...forbidden].some(el => el?.contains(e.target))) return;

      setShowInitialElements(false);

      const sticker = await getStickerByCategory();
      const { width, rotation, height } = generateRandomSize();
      const stickerWithStyles = { ...sticker, id: Date.now() + sticker.hexcode,
          height, width, rotation,
          top: (e.clientY - parseInt(height)/2) + 'px',
          left: (e.clientX - parseInt(width)/2) + 'px',
      };
      setStickers(prev => [...prev, stickerWithStyles]);
  }

  return (
    <main
      onClick={handleCanvasClick}
      className="cursor-pointer relative mx-auto flex h-svh min-h-screen w-full flex-col items-center justify-center gap-5 w-xs:justify-normal"
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
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Heading />
            </motion.div>
          </>
        )}
          {stickers && stickers.map(sticker => (
              <motion.div
                  key={sticker.id}
                  style={{
                      position: 'absolute',
                      top: sticker.top,
                      left: sticker.left,
                      width: sticker.width,
                      height: sticker.height,
                      transform: `rotate(${sticker.rotation})`,
                      cursor: 'grab',
                      filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5))'
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: sticker.rotation }}
                  transition={{ duration: 0.3, type: "spring" }}
                  drag
                  dragMomentum={false}
                  dragControls={controls}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                  whileDrag={{ cursor: 'grabbing' }}
              >
                  <img
                      src={sticker.src}
                      alt={sticker.annotation}
                      style={{
                          width: '100%',
                          height: '100%',
                          pointerEvents: 'none',
                      }}
                  />
              </motion.div>
          ))}
      </AnimatePresence>
      <Toolbar backgroundProps={{ backgroundColor, dotColor, setBackgroundColor, setDotColor }} />
    </main>
  );
}

export default App;
