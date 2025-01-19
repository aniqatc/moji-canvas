import { motion } from 'framer-motion';

export default function Sticker({
  sticker,
  get,
  scale,
  drag,
  dragControls,
  dragConstraints,
  onDragStart,
  onDragEnd,
  whileDrag,
}) {
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
      onDragEnd={onDragEnd}
      whileDrag={whileDrag}
      aria-label={`${sticker.annotation} sticker`}
    >
      <motion.div
        key={get.speed}
        animate={
          get.animateMode && get.float
            ? {
                y: sticker.floatOffsets.y,
                x: sticker.floatOffsets.x,
              }
            : { y: 0, x: 0 }
        }
        transition={{
          y: {
            duration: 2 / get.speed,
            repeat: get.float ? Infinity : 0,
            repeatType: 'mirror',
            ease: 'easeInOut',
          },
          x: {
            duration: 2 / get.speed,
            repeat: get.float ? Infinity : 0,
            repeatType: 'mirror',
            ease: 'easeInOut',
          },
        }}
      >
        <motion.div
          key={get.speed}
          initial={{ rotate: sticker.rotation }}
          animate={
            get.animateMode && get.rotate
              ? {
                  rotate: [0, parseInt(sticker.rotation) + 100],
                }
              : { rotate: sticker.rotation }
          }
          transition={{
            duration: 2 / get.speed,
            repeat: get.rotate ? Infinity : 0,
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
