export default function BaseSlider({ id, label, min = 0, max = 2, step = 0.1, value, onChange }) {
    return (
        <div className="relative flex flex-col gap-2 mt-2 mx-auto">
            <input type="range"
                   id={id}
                   min={min}
                   max={max}
                   step={step}
                   value={value}
                   onChange={onChange}
                   className="h-sm:w-16 w-20 h-1 mt-2 bg-gray-200 rounded-lg cursor-pointer accent-slate-500 border border-slate-300
                           appearance-none
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-3
                           [&::-webkit-slider-thumb]:h-3
                           [&::-webkit-slider-thumb]:bg-gray-500/75
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:shadow-md
                           [&::-moz-range-thumb]:w-3
                           [&::-moz-range-thumb]:h-3
                           [&::-moz-range-thumb]:bg-gray-500/75
                           [&::-moz-range-thumb]:rounded-full
                           [&::-moz-range-thumb]:shadow-md
                           [&::-moz-range-track]:bg-gray-200
                           [&::-moz-range-track]:rounded-full
                           active:[&::-webkit-slider-thumb]:bg-gray-700
                           active:[&::-moz-range-thumb]:bg-gray-700"/>
            <span className="text-[11px] text-gray-500 absolute left-0 -top-2.5">0</span>
            <span className="text-[11px] text-gray-500 absolute right-0 -top-2.5">2x</span>
            <label htmlFor="scale-range">{label}</label>
        </div>
    )
}