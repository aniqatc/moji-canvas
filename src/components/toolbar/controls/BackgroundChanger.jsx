import { useState } from 'react';

export default function BackgroundChanger() {
    const [backgroundColor, setBackgroundColor] = useState('#ffefef');
    const [dotColor, setDotColor] = useState('#ec1111');

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="mt-1 flex flex-col items-center gap-1">
                <input
                    type="color"
                    value={backgroundColor}
                    onChange={(event) => setBackgroundColor(event.target.value)}
                    className="transition-all outline-0 w-16 h-11 cursor-pointer p-0.5 h-sm:w-12
                    rounded bg-white border border-stone-200 focus:border-stone-400 focus:bg-active-gray"
                />
                <span>Background</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <input
                    type="color"
                    value={dotColor}
                    onChange={(event) => setDotColor(event.target.value)}
                    className="transition-all outline-0 w-16 h-11 cursor-pointer p-0.5 h-sm:w-12
                    rounded bg-white border border-stone-200 focus:border-stone-400 focus:bg-active-gray"
                />
                <span>Dots</span>
            </div>
        </div>
    );
}