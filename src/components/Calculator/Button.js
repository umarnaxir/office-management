import React from "react";

const Button = ({ value, onClick, className = "", span = false }) => {
  const baseClass = span ? "span-two" : "";

  return (
    <button onClick={() => onClick(value)} className={`${baseClass} ${className}`}>
      {value}
    </button>
  );
};

export default Button;
