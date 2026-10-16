import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, animate, useDragControls, useMotionValue } from 'framer-motion';
import {
  X,
  Copy,
  ArrowLineUp,
  Trash,
  Play,
  DotsSixVertical,
  CaretDown,
  CaretUp,
  ArrowCounterClockwise,
} from '@phosphor-icons/react';
import { useCanvas } from '../../contexts';
import { ANIMATIONS, ANIMATION_STICKER_LIMIT } from '../../utils';

// Panel for the selected sticker: its animation, size, tilt and layer.
// Docked on the right on larger screens and as a sheet on phones. Drag the
// header to move it anywhere, or collapse it to just the header.
const PHONE_WIDTH = 600;
export default function StickerInspector() {
  const {
    selectedSticker: sticker,
    setSelectedId,
    updateSticker,
    duplicateSticker,
    bringToFront,
    removeSticker,
    togglePlaying,
    isOverAnimationLimit,
    animationProps,
  } = useCanvas();
  const { playing } = animationProps;

  const areaRef = useRef(null);
  const dragControls = useDragControls();
  // Kept outside the panel so its position survives switching between stickers.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [moved, setMoved] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dock, setDock] = useState('bottom');

  // On phones, until the panel has been moved by hand, keep it on the half
  // of the screen away from the selected sticker so it never covers it.
  const selectedId = sticker?.id;
  const stickerX = sticker?.translateX;
  const stickerY = sticker?.translateY;
  useEffect(() => {
    if (!selectedId || moved || window.innerWidth > PHONE_WIDTH) return;
    const node = document.getElementById(selectedId);
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setDock(rect.top + rect.height / 2 > window.innerHeight * 0.5 ? 'top' : 'bottom');
  }, [selectedId, stickerX, stickerY, moved]);

  function startDrag(event) {
    if (event.target.closest('button')) return;
    dragControls.start(event);
  }

  function resetPosition() {
    animate(x, 0, { type: 'spring', bounce: 0.2, duration: 0.4 });
    animate(y, 0, { type: 'spring', bounce: 0.2, duration: 0.4 });
    setMoved(false);
  }

  const stop = (event) => event.stopPropagation();

  return (
    <div
      ref={areaRef}
      className={`inspector-wrap pointer-events-none fixed inset-0 z-40 flex items-center justify-end p-3 max-[600px]:p-2 ${
        dock === 'top' ? 'max-[600px]:items-start' : 'max-[600px]:items-end'
      }`}
    >
      <AnimatePresence>
        {sticker && (
          <motion.div
            key="sticker-inspector"
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={areaRef}
            onDragEnd={() => setMoved(true)}
            style={{ x, y }}
            className="pointer-events-auto w-64 max-[600px]:w-full"
          >
            <motion.aside
              aria-label="Selected sticker settings"
              onClick={stop}
              onPointerDown={stop}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', duration: 0.4 }}
              style={{ backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
              className="custom-scrollbar flex max-h-[calc(100dvh-24px)] cursor-default flex-col gap-3 overflow-y-auto rounded-md border border-stone-200 bg-white/90 p-3 text-xs text-gray-600 shadow max-[600px]:max-h-[52dvh]"
            >
              <header
                onPointerDown={startDrag}
                title="Drag to move"
                className="-m-1 flex cursor-grab touch-none select-none items-center gap-1.5 rounded p-1 active:cursor-grabbing"
              >
                <DotsSixVertical weight="bold" size={16} aria-hidden="true" className="flex-shrink-0 text-gray-400" />
                <img src={sticker.src} alt="" draggable={false} className="size-9 flex-shrink-0" />
                <p className="min-w-0 flex-1 truncate font-semibold capitalize text-gray-800" title={sticker.annotation}>
                  {sticker.annotation}
                </p>
                {moved && (
                  <HeaderButton onClick={resetPosition} label="Put panel back in its usual spot">
                    <ArrowCounterClockwise weight="bold" size={16} />
                  </HeaderButton>
                )}
                <HeaderButton
                  onClick={() => setCollapsed((prev) => !prev)}
                  label={collapsed ? 'Expand sticker settings' : 'Collapse sticker settings'}
                  expanded={!collapsed}
                >
                  {collapsed ? <CaretUp weight="bold" size={16} /> : <CaretDown weight="bold" size={16} />}
                </HeaderButton>
                <HeaderButton onClick={() => setSelectedId(null)} label="Close sticker settings">
                  <X weight="bold" size={18} />
                </HeaderButton>
              </header>

              {!collapsed && (
                <>
                  <fieldset className="flex flex-col gap-1.5">
                    <legend className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Animation
                    </legend>
                    <div className="grid grid-cols-3 gap-1">
                      {ANIMATIONS.map((animation) => {
                        const active = sticker.animation === animation.id;
                        return (
                          <button
                            key={animation.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => updateSticker(sticker.id, { animation: animation.id })}
                            className={`rounded border px-1 py-1.5 text-[11px] font-semibold transition-all active:scale-95 ${
                              active
                                ? 'border-transparent bg-accent-maroon text-white'
                                : 'border-stone-200 bg-white/60 text-gray-600 hover:bg-active-gray hover:text-black'
                            }`}
                          >
                            {animation.label}
                          </button>
                        );
                      })}
                    </div>
                    {!playing && sticker.animation !== 'none' && (
                      <p className="flex items-center justify-between gap-2 rounded bg-active-gray px-2 py-1.5 text-[11px]">
                        {isOverAnimationLimit ? (
                          <span>Motion pauses above {ANIMATION_STICKER_LIMIT} stickers.</span>
                        ) : (
                          <>
                            <span>Motion is paused.</span>
                            <button
                              type="button"
                              onClick={togglePlaying}
                              className="flex items-center gap-1 font-semibold text-gray-800 underline"
                            >
                              <Play weight="fill" size={12} /> Play
                            </button>
                          </>
                        )}
                      </p>
                    )}
                  </fieldset>

                  <div className="flex flex-col gap-2">
                    <RangeRow
                      id="sticker-size"
                      label="Size"
                      min={0.3}
                      max={2.5}
                      step={0.05}
                      value={sticker.size}
                      display={`${Math.round(sticker.size * 100)}%`}
                      onChange={(value) => updateSticker(sticker.id, { size: value })}
                    />
                    <RangeRow
                      id="sticker-speed"
                      label="Speed"
                      min={0.25}
                      max={3}
                      step={0.25}
                      value={sticker.speed}
                      display={formatSpeed(sticker.speed)}
                      disabled={sticker.animation === 'none'}
                      onChange={(value) => updateSticker(sticker.id, { speed: value })}
                    />
                    <RangeRow
                      id="sticker-tilt"
                      label="Tilt"
                      min={-180}
                      max={180}
                      step={1}
                      value={sticker.rotation}
                      display={`${sticker.rotation}°`}
                      onChange={(value) => updateSticker(sticker.id, { rotation: value })}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    <PanelButton onClick={() => duplicateSticker(sticker.id)} icon={Copy} label="Duplicate" />
                    <PanelButton onClick={() => bringToFront(sticker.id)} icon={ArrowLineUp} label="To front" />
                    <PanelButton onClick={() => removeSticker(sticker.id)} icon={Trash} label="Remove" danger />
                  </div>

                  <p className="text-[11px] text-gray-500">
                    <span className="max-[600px]:hidden">Arrow keys nudge (Shift for more). Delete removes. </span>
                    Drag the header to move this panel.
                  </p>
                </>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 0.25 -> "¼x", 1.5 -> "1½x", 2 -> "2x"
const FRACTIONS = { 0.25: '¼', 0.5: '½', 0.75: '¾' };
function formatSpeed(speed) {
  const whole = Math.floor(speed);
  const fraction = FRACTIONS[Math.round((speed - whole) * 100) / 100] ?? '';
  return `${whole || ''}${fraction}x`;
}

function RangeRow({ id, label, min, max, step, value, display, onChange, disabled = false }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className={`w-11 font-semibold ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        className="moji-range min-w-0 flex-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
      />
      <output htmlFor={id} className="w-11 text-right tabular-nums text-gray-500">
        {display}
      </output>
    </div>
  );
}

function HeaderButton({ onClick, label, expanded, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-expanded={expanded}
      className="flex-shrink-0 rounded p-1 text-gray-500 transition-colors hover:bg-active-gray hover:text-black"
    >
      {children}
    </button>
  );
}

function PanelButton({ onClick, icon: Icon, label, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 rounded border border-stone-200 px-1 py-1.5 text-[11px] font-semibold transition-all hover:bg-active-gray active:scale-95 ${
        danger ? 'text-red-700 hover:text-red-800' : 'text-gray-600 hover:text-black'
      }`}
    >
      <Icon weight="bold" size={20} />
      {label}
    </button>
  );
}
