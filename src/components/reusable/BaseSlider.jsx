export default function BaseSlider({ id, label, min = 0, max = 2, step = 0.1, value, onChange, disabled = false }) {
  return (
    <div className="relative mx-auto mt-2 flex flex-col gap-2">
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="mt-2 h-1 w-20 cursor-pointer appearance-none rounded-lg border border-slate-300 bg-gray-200 accent-slate-500 h-sm:w-16 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-500/75 [&::-moz-range-thumb]:shadow-md active:[&::-moz-range-thumb]:bg-gray-700 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-gray-200 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-500/75 [&::-webkit-slider-thumb]:shadow-md active:[&::-webkit-slider-thumb]:bg-gray-700"
      />
      <span className="absolute -top-2.5 left-0 text-[11px] text-gray-500">0</span>
      <span className="absolute -top-2.5 right-0 text-[11px] text-gray-500">2x</span>
      <label htmlFor="scale-range" className={disabled ? 'cursor-not-allowed text-gray-500/85' : ''}>{label}</label>
    </div>
  );
}
