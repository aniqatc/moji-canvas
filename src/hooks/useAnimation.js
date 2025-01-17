import { useState } from 'react';

export default function useAnimation() {
    const [animateMode, setAnimateMode] = useState(false);
    const [float, setFloat] = useState(false);
    const [rotate, setRotate] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [scale, setScale] = useState(1);

    return {
        animationProps: {
            animateMode,
            float,
            rotate,
            speed,
            setRotate,
            setFloat,
            setSpeed,
            setAnimateMode
        },
        get: {
            animateMode, float, rotate, speed, scale,
        },
        setters: {
            setAnimateMode, setFloat, setRotate, setSpeed, setScale
        },
        reset: () => {
            setSpeed(1);
            setScale(1);
            setAnimateMode(false);
            setRotate(false);
            setFloat(false);
        }
    }
}