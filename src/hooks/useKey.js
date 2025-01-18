import { useEffect } from 'react';

export default function useKey(key, fn) {
  function handleKeyPress(event) {
    if (event.key === key) {
      fn(event);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [key, fn]);
}
