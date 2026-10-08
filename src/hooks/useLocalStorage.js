import { useState } from 'react';

function readStorage(key, initialValue, transform) {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return initialValue;
    const parsed = JSON.parse(stored);
    return parsed === null ? initialValue : transform(parsed);
  } catch {
    // Storage blocked (private mode) or a corrupted value: start from the default.
    return initialValue;
  }
}

export default function useLocalStorage(key, initialValue, transform = (value) => value) {
  const [value, setValue] = useState(() => readStorage(key, initialValue, transform));

  function saveToStorage() {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota or privacy errors; the canvas keeps working in memory.
    }
  }

  return [value, setValue, saveToStorage];
}
