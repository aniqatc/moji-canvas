import { toPng } from 'html-to-image';

async function downloadImage(ref) {
  const toolbar = ref.current.querySelector('aside');
  try {
    toolbar.style.opacity = 0;
    const dataURL = await toPng(ref.current, {
      quality: 1,
      pixelRatio: window.devicePixelRatio || 2,
      skipFonts: true, // to avoid error
    });

    const link = document.createElement('a');
    link.download = 'moji-canvas.png';
    link.href = dataURL;
    link.click();
  } catch (error) {
    console.error('Error occurred during download: ' + error.message);
  } finally {
    toolbar.style.opacity = 1;
  }
}

export { downloadImage };
