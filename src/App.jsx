import { useState } from 'react';
import { Alien } from 'phosphor-react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-5"
    style={{
        backgroundColor: "#ffefef",
        backgroundImage:  "radial-gradient(#ec1111 2px, transparent 2px), " +
            "radial-gradient(#ec1111 2px, #ffefef 2px)",
        backgroundSize: "100px 100px",
        backgroundPosition: "0 0, 50px 50px"
    }}>
      <h1 className="font-display text-6xl text-[#540F0F]">moji canvas</h1>
      <button
        className="text-white bg-gradient-to-br from-pink-500 to-orange-400
        hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200
        font-medium rounded-lg text-sm px-5 py-2.5 flex items-center gap-1"
        onClick={() => setCount((count) => count + 5)}
      >
        <Alien size={24} weight="light" /> count is {count}
      </button>
    </div>
  );
}
export default App;
