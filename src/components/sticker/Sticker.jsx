import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useCanvas } from '../../contexts';

export default function Sticker({ sticker, drag, dragControls, dragConstraints, onDragStart, whileDrag }) {
  const { setStickers, scale, animationProps, setIsDragging } = useCanvas();
  const { animateMode, float, rotate, speed } = animationProps;

  const handleDragEnd = useCallback(
    (event, info) => {
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
    },
    [setIsDragging, setStickers, sticker.id]
  );

  return (
    <motion.div
      tabIndex={0}
      className="sticker-div"
      id={sticker.id}
      style={{
        position: 'absolute',
        top: sticker.top,
        left: sticker.left,
        width: sticker.width,
        height: sticker.height,
        cursor: 'grab',
        outline: 'none',
        x: sticker.translateX ?? 0,
        y: sticker.translateY ?? 0,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      drag={drag}
      dragControls={dragControls}
      dragConstraints={dragConstraints}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      whileDrag={whileDrag}
      aria-label={`${sticker.annotation} sticker`}
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
            repeatType: 'mirror',
            ease: 'easeInOut',
          },
          x: {
            duration: 2 / speed,
            repeat: float ? Infinity : 0,
            repeatType: 'mirror',
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
            repeatType: 'mirror',
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
  );
}
