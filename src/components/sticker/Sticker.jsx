import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useCanvas } from '../../contexts';

export default function Sticker({ sticker, constraintsRef }) {
  const { setStickers, scale, setIsDragging, selectedId, setSelectedId, stickerMode, handleStickerActivate } =
    useCanvas();
  const wasDragged = useRef(false);

  const isSelected = selectedId === sticker.id;
  const factor = Number(scale) * sticker.size;
  const drift = sticker.floatOffsets || { x: [0], y: [0] };

  function handleDragStart() {
    wasDragged.current = true;
    setIsDragging(true);
  }

  function handleDragEnd(event, info) {
    setIsDragging(false);
    setStickers((prev) =>
      prev.map((s) =>
        s.id === sticker.id
          ? { ...s, translateX: (s.translateX || 0) + info.offset.x, translateY: (s.translateY || 0) + info.offset.y }
          : s
      )
    );
  }

  function handleClick(event) {
    event.stopPropagation();
    // A drag ends with a click on the same sticker; ignore it.
    if (wasDragged.current) {
      wasDragged.current = false;
      return;
    }
    handleStickerActivate(sticker.id);
  }

  return (
    <motion.div
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      className="sticker-div"
      id={sticker.id}
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      whileDrag={{ cursor: 'grabbing' }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onPointerDown={() => {
        wasDragged.current = false;
        if (stickerMode === 'add') setSelectedId(sticker.id);
      }}
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: sticker.top,
        left: sticker.left,
        width: sticker.width,
        height: sticker.height,
        cursor: 'grab',
        outline: 'none',
        touchAction: 'none',
        x: sticker.translateX ?? 0,
        y: sticker.translateY ?? 0,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      aria-label={`${sticker.annotation} sticker${sticker.animation !== 'none' ? `, ${sticker.animation} animation` : ''}`}
    >
      <div
        className={`sticker-anim anim-${sticker.animation}`}
        style={{
          '--dx': `${drift.x[0] ?? 0}px`,
          '--dy': `${drift.y[0] ?? 0}px`,
          '--sticker-speed': sticker.speed,
          // Offset each sticker so matching animations don't move in lockstep.
          animationDelay: `-${(parseInt(sticker.hexcode, 16) % 20) / 10}s`,
        }}
      >
        <div style={{ width: '100%', height: '100%', transform: `rotate(${sticker.rotation}deg)` }}>
          <img
            src={sticker.src}
            alt={sticker.annotation}
            draggable={false}
            className="sticker-img"
            style={{
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              transform: `scale(${factor})`,
            }}
          />
        </div>
      </div>
      {isSelected && (
        <span
          aria-hidden="true"
          className="selection-ring"
          style={{ width: `calc(${factor * 100}% + 20px)`, height: `calc(${factor * 100}% + 20px)` }}
        />
      )}
    </motion.div>
  );
}
