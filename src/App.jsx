import { useState } from 'react';
import { Alien } from 'phosphor-react';

function App() {
  const [count, setCount] = useState(10);

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-3 bg-green-50">
      <h1 className="font-display text-4xl">moji canvas</h1>
      <button
        className="flex items-center gap-1 rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-5 py-2.5 text-center font-handwritten text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-green-200"
        onClick={() => setCount((count) => count + 10)}
      >
        <Alien size={24} weight="light" /> count is {count}
      </button>
      <p className="w-[32ch] text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.{' '}
      </p>
    </div>
  );
}

export default App;
