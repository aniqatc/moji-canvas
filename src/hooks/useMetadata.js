import { useEffect, useState } from 'react';

export default function useMetadata() {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    async function getMetadata() {
      const response = await fetch(`/data/metadata.json`);
      const data = await response.json();
      setMetadata(data);
    }
    getMetadata();
  }, []);

  return metadata;
}
