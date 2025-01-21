import { forwardRef } from 'react';

function CanvasBackground({ backgroundColor, dotColor, onClick, children }, ref) {
  return (
    <main
      tabIndex={0}
      aria-label="Sticker canvas area"
      ref={ref}
      onClick={onClick}
      className="relative mx-auto flex h-dvh min-h-screen w-full cursor-pointer flex-col items-center justify-center gap-5 overflow-hidden focus-visible:border-8 focus-visible:border-pink-900/50 w-xs:justify-normal"
      style={{
        backgroundColor: backgroundColor,
        backgroundImage: `radial-gradient(${dotColor} 2px, transparent 2px), 
                           radial-gradient(${dotColor} 2px, ${backgroundColor} 2px)`,
        backgroundSize: '100px 100px',
        backgroundPosition: '0 0, 50px 50px',
        '--accent-maroon': `color-mix(in srgb, ${dotColor}, #540F0F)`,
        '--muted': `color-mix(in srgb, ${dotColor}, #000000 50%)`,
        '--highlight': `color-mix(in srgb, ${backgroundColor}, rgba(0,0,0,0.1))`,
      }}
    >
      {children}
    </main>
  );
}

export default forwardRef(CanvasBackground);
