import { useEffect } from 'react';

// Runs `fn` when any of `keys` is pressed. Accepts a single key or an array.
export default function useKey(keys, fn) {
  const keyList = Array.isArray(keys) ? keys : [keys];
  const keyId = keyList.join('|');

  useEffect(() => {
    function handleKeyPress(event) {
      if (keyList.includes(event.key)) {
        fn(event);
      }
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
    // keyList is rebuilt every render; keyId captures its contents.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, keyId]);
}
