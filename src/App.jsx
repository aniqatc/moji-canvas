import { Heading, ClickHintText, Toolbar } from './components';

function App() {
return (
    <main className="h-svh overflow-hidden mx-auto flex min-h-screen w-full flex-col items-center justify-center
    gap-5 w-xs:justify-normal"
          style={{
              backgroundColor: "#ffefef",
              backgroundImage:  "radial-gradient(#ec1111 2px, transparent 2px), " +
                    "radial-gradient(#ec1111 2px, #ffefef 2px)",
              backgroundSize: "100px 100px",
              backgroundPosition: "0 0, 50px 50px"
        }}>
        <ClickHintText />
        <Heading />
        <Toolbar />
    </main>
  );
}

export default App;
