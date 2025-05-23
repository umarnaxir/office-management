import React from "react";
import Button from "./Button";

const ButtonGrid = ({ onButtonClick }) => {
  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
  ];

  return (
    <div className="buttons">
      {buttons.map((btn, idx) => (
        <Button key={idx} value={btn} onClick={onButtonClick} />
      ))}
      <Button value="C" onClick={onButtonClick} className="span-two" />
      <Button value="DEL" onClick={onButtonClick} className="span-two" />
    </div>
  );
};

export default ButtonGrid;
