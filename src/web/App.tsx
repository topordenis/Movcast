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
        <a href="https://esbuild.github.io" target="_blank">
          <img src={esbuildLogo} className="logo" alt="esbuild logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
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
