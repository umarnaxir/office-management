import React, { useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import "@/styles/calculator.css"; 

const Calculator = () => {
  const [input, setInput] = useState("");
  console.log(input)

  const handleButtonClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "DEL") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <div className="calculator">
      <Display value={input} />
      <ButtonGrid onButtonClick={handleButtonClick} />
    </div>
  );
};

export default Calculator;
