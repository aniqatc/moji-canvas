import { toPng } from 'html-to-image';

async function downloadImage(ref) {
  try {
    const dataURL = await toPng(ref.current, {
      quality: 1,
      pixelRatio: window.devicePixelRatio || 2,
      skipFonts: true,
      filter: (node) => {
        // Make sure toolbar 'aside' and toast 'notification' isn't in the screenshot
        return !(
          (node.tagName && node.tagName.toLowerCase() === 'aside') ||
          (node.classList && node.classList.contains('notification'))
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
