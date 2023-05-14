import React, { useEffect, useRef, useState } from "react";
import useResizeBouncer from "./hooks/useResizeBouncer";
const wasmBind = import("../../pkg/index");

/**
 * @typedef {import("../../pkg/index").mult} WMult
 * @typedef {import("../../pkg/index").start} WStart
 */

const App = () => {
  const headerRef = useRef(null);
  const canvasRef = useRef(null);
  const [wasm, setWasm] = useState(null);
  const [count, setCount] = useState(BigInt(1));

  useEffect(() => {
    wasmBind.then(setWasm);
  }, []);

  useEffect(() => {
    if (wasm) {
      startWasm(wasm.start);
    }
  }, [wasm]);

  useResizeBouncer(() => {
    if (wasm) {
      startWasm(wasm.start);
    }
  }, 300);

  /**
   * @param {WStart} start
   */
  const startWasm = (start) => {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    canvasRef.current.height -= headerRef.current.clientHeight;
    start();
  };

  /**
   * @param {WMult} mult
   */
  const countIt = (mult) => {
    const newCount = mult(count, BigInt(2));
    setCount(newCount);
  };

  const handleButtonClick = () => {
    startWasm(wasm.start);
    countIt(wasm.mult);
  };

  return (
    <div>
      <div ref={headerRef}>
        <h1>Hello there world! {count.toString()}</h1>
        <button onClick={() => handleButtonClick()}> Start Wasm </button>
      </div>

      <canvas id={"canvas"} ref={canvasRef} />
    </div>
  );
};

export default App;
