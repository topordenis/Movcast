import { useEffect, useState } from "react";

import reactLogo from "./icons/react.svg";
import esbuildLogo from "./icons/esbuild.svg";
import "./App.scss";

export const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.myAPI.updateTitle(count);
  }, [count]);

  return (
    <div className="App">
      <div>
        <div
          className="external"
          onClick={() => window.myAPI.openExternal("https://esbuild.github.io")}
        >
          <img src={esbuildLogo} className="logo" alt="esbuild logo" />
        </div>
        <div
          className="external"
          onClick={() => window.myAPI.openExternal("https://react.dev/")}
        >
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
      </div>
      <h1>esbuild + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/web/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the esbuild and React logos to learn more
      </p>
    </div>
  );
};
