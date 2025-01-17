import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return JSON.parse(localStorage.getItem(key)) || initialValue;
    });

    function saveToStorage() {
        localStorage.setItem(key, JSON.stringify(value));
    }

    return [value, setValue, saveToStorage];
}