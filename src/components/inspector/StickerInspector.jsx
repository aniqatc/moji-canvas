import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, ArrowLineUp, Trash, Play } from '@phosphor-icons/react';
import { useCanvas } from '../../contexts';
import { ANIMATIONS, ANIMATION_STICKER_LIMIT } from '../../utils';

// Panel for the selected sticker: its animation, size, tilt and layer.
// Docked on the right on larger screens and as a bottom sheet on phones.
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

  const stop = (event) => event.stopPropagation();

  return (
    <div className="inspector-wrap pointer-events-none fixed inset-y-0 right-3 z-40 flex items-center max-[600px]:inset-x-2 max-[600px]:bottom-2 max-[600px]:top-auto max-[600px]:items-end">
      <AnimatePresence>
        {sticker && (
          <motion.aside
            key="sticker-inspector"
            aria-label="Selected sticker settings"
            onClick={stop}
            onPointerDown={stop}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ type: 'spring', duration: 0.4 }}
            style={{ backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
            className="custom-scrollbar pointer-events-auto flex max-h-[calc(100dvh-24px)] w-64 cursor-default flex-col gap-3 overflow-y-auto rounded-md border border-stone-200 bg-white/90 p-3 text-xs text-gray-600 shadow max-[600px]:max-h-[52dvh] max-[600px]:w-full"
          >
            <header className="flex items-center gap-2">
              <img src={sticker.src} alt="" className="size-9 flex-shrink-0" />
              <p className="min-w-0 flex-1 truncate font-semibold capitalize text-gray-800" title={sticker.annotation}>
                {sticker.annotation}
              </p>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close sticker settings"
                className="rounded p-1 text-gray-500 transition-colors hover:bg-active-gray hover:text-black"
              >
                <X weight="bold" size={18} />
              </button>
            </header>

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

            <p className="text-[11px] text-gray-500 max-[600px]:hidden">
              Arrow keys nudge (Shift for more). Delete removes.
            </p>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

function RangeRow({ id, label, min, max, step, value, display, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="w-9 font-semibold text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="moji-range min-w-0 flex-1 cursor-pointer"
      />
      <output htmlFor={id} className="w-11 text-right tabular-nums text-gray-500">
        {display}
      </output>
    </div>
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
