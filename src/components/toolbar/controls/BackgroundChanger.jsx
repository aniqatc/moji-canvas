import { useCanvas } from '../../../contexts';

export default function BackgroundChanger() {
  const { setBackgroundColor, setDotColor, backgroundColor, dotColor } = useCanvas();
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="mt-1 flex flex-col items-center gap-1">
        <input
          type="color"
          value={backgroundColor}
          onChange={(event) => setBackgroundColor(event.target.value)}
          className="h-10 w-16 cursor-pointer rounded border border-stone-200 bg-white p-0.5 outline-0 transition-all focus:border-stone-400 focus:bg-active-gray h-sm:w-12"
        />
        <span>Background</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <input
          type="color"
          value={dotColor}
          onChange={(event) => setDotColor(event.target.value)}
          className="h-10 w-16 cursor-pointer rounded border border-stone-200 bg-white p-0.5 outline-0 transition-all focus:border-stone-400 focus:bg-active-gray h-sm:w-12"
        />
        <span>Dots</span>
      </div>
    </div>
  );
}
