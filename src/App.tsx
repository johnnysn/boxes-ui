import { useState } from "react";
import Navbar from "./Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <>
        <header>
          <Navbar />
        </header>
        <main className="px-2 sm:px-4 lg:px-6 py-4 flex justify-center">
          <div className="w-full max-w-5xl"></div>
        </main>
      </>
    </>
  );
}

export default App;
