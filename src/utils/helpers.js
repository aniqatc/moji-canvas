function positionBasedOnEvent(event, computedSizes) {
    const isKeyboardEvent = event.type === 'keydown';
    return isKeyboardEvent
        ? {
            top: Math.random() * (window.innerHeight - 200) + 'px',
            left: Math.random() * (window.innerWidth - 200) + 'px',
        }
        : {
            top: event.clientY - parseInt(computedSizes.height) / 2 + 'px',
            left: event.clientX - parseInt(computedSizes.width) / 2 + 'px',
        };
}

function generateRandomSizeAndPosition() {
    const size = Math.floor(Math.random() * 100 + 100);
    return {
        width: size + 'px',
        height: size + 'px',
        rotation: getPositiveOrNegativeValue() * Math.random() * 360 + 'deg',
        floatOffsets: {
            x: [
                getFloatOffset(window.innerWidth, 0.35),
                getFloatOffset(window.innerWidth, 0.35),
            ],
            y: [
                getFloatOffset(window.innerHeight, 0.35),
                getFloatOffset(window.innerHeight, 0.35),
            ],
        },
    };
}

function getPositiveOrNegativeValue() {
    return Math.random() > 0.5 ? -1 : 1;
}

function getFloatOffset(limit, portion) {
    return getPositiveOrNegativeValue() * Math.random() * (limit * portion);
}

export { generateRandomSizeAndPosition, positionBasedOnEvent };