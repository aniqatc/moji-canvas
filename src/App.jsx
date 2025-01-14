import { useState } from 'react';
import { Heading, ClickHintText, Toolbar } from './components';

function App() {
    const [backgroundColor, setBackgroundColor] = useState('#ffefef');
    const [dotColor, setDotColor] = useState('#ec1111');

return (
    <main className="h-svh overflow-hidden mx-auto flex min-h-screen w-full flex-col items-center justify-center
    gap-5 w-xs:justify-normal"
          style={{
              backgroundColor: backgroundColor,
              backgroundImage:  `radial-gradient(${dotColor} 2px, transparent 2px), 
                           radial-gradient(${dotColor} 2px, ${backgroundColor} 2px)`,
              backgroundSize: "100px 100px",
              backgroundPosition: "0 0, 50px 50px",
              '--accent-maroon': `color-mix(in srgb, ${dotColor}, #540F0F)`,
              '--muted': `color-mix(in srgb, ${dotColor}, #000000 50%)`,
              '--highlight': `color-mix(in srgb, ${backgroundColor}, rgba(0,0,0,0.1))`          }}>
        <ClickHintText />
        <Heading />
        <Toolbar backgroundProps={{ backgroundColor, dotColor,
            setBackgroundColor, setDotColor }} />
    </main>
  );
}

export default App;
