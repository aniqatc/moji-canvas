import { useState } from 'react';
import { BaseSlider } from '../../reusable';

export default function AnimationControls() {
    const [animationMode, setAnimationMode] = useState(false);
    const [float, setFloat] = useState(animationMode);
    const [rotate, setRotate] = useState(animationMode);
    const [speed, setSpeed] = useState(1);

    return (
        <>
    <fieldset className="block mx-auto accent-slate-500">
        <div key="animation-checkbox" className="flex items-center gap-1">
            <input type="checkbox" id="animation-checkbox" checked={animationMode} onChange={() => {
                setAnimationMode(!animationMode);
                setRotate(!animationMode);
                setFloat(!animationMode);
            }} />
            <label htmlFor="animation-checkbox" className="cursor-pointer">Animate</label>
        </div>
        <div key="float-checkbox" className="flex items-center gap-1">
            <input type="checkbox" id="float-checkbox" className={`${animationMode ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                   disabled={!animationMode} checked={float} onChange={() => { setFloat(!float) }} />
            <label htmlFor="float-checkbox" className={`${animationMode  ? 'cursor-pointer' : 'cursor-not-allowed'}`}>Float</label>
        </div>
        <div key="rotate-checkbox" className="flex items-center gap-1">
            <input type="checkbox" id="rotate-checkbox" className={`${animationMode ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                   disabled={!animationMode} checked={rotate} onChange={() => { setRotate(!rotate) }} />
            <label htmlFor="rotate-checkbox" className={`${animationMode ? 'cursor-pointer' : 'cursor-not-allowed'}`}>Rotate</label>
        </div>
    </fieldset>
            <BaseSlider id="speed-slider"
                        min={0}
                        max={2}
                        step={0.1}
                        value={speed}
                        onChange={(event) => setSpeed(event.target.value)}
                        label="Speed" />
        </>
    )
}