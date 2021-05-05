import { useState } from "react";
import Calculator from "./components/Calculator";
import Buttons from "./components/Buttons";
import Display from "./components/Display";
import "./global.css";
import Engine from "./Engine";

function App() {
  const [engine] = useState(new Engine());
  const [displayValue, setDisplayValue] = useState("0");

  function handleButtonClick(value) {
    setDisplayValue(engine.calculate(value));
  }
  return (
    <Calculator>
      <Display value={displayValue} />
      <Buttons onClick={handleButtonClick} />
    </Calculator>
  );
}

export default App;
