import { toPng } from 'html-to-image';

async function downloadImage(ref) {
  const toolbar = ref.current.querySelector('aside');
  toolbar.style.opacity = 0;

  const dataURL = await toPng(ref.current, {
    quality: 1,
    pixelRatio: window.devicePixelRatio || 2,
  });
  const link = document.createElement('a');
  link.download = 'moji-canvas.png';
  link.href = dataURL;
  link.click();

  toolbar.style.opacity = 1;
}

export { downloadImage };
