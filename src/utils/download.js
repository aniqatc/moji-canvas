import { toPng } from 'html-to-image';

async function downloadImage(ref) {
  try {
    const dataURL = await toPng(ref.current, {
      quality: 1,
      pixelRatio: window.devicePixelRatio || 2,
      skipFonts: true,
      filter: (node) => {
        // Keep the toolbar, sticker panel, toast and selection outline out of the image
        return !(
          (node.tagName && node.tagName.toLowerCase() === 'aside') ||
          (node.classList &&
            (node.classList.contains('notification') ||
              node.classList.contains('inspector-wrap') ||
              node.classList.contains('selection-ring')))
        );
      },
    });

    const link = document.createElement('a');
    link.download = 'moji-canvas.png';
    link.href = dataURL;
    link.click();
  } catch (error) {
    console.error('Error occurred during download: ' + error.message);
  }
}

export { downloadImage };
