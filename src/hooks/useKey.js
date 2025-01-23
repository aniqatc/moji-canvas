import { useEffect, useCallback } from 'react';

export default function useKey(key, fn) {
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === key) {
        fn(event);
      }
    },
    [fn, key]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [fn, key, handleKeyPress]);
}
