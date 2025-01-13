export default function BackgroundChanger() {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="mt-1 flex flex-col items-center gap-1">
                <input
                    type="color"
                    className="w-16 h-11 cursor-pointer p-0.5 rounded bg-white border border-stone-200"
                />
                <span>Background</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <input
                    type="color"
                    className="w-16 h-11 cursor-pointer p-0.5 rounded bg-white border border-stone-200"
                />
                <span>Dots</span>
            </div>
        </div>
    );
}