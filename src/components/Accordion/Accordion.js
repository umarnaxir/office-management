import React, { useState } from "react";

const accordionData = [
  {
    question: "What is your name?",
    answer: "My name is Umar Nazir"
  },
  {
    question: "What do you study?",
    answer: "I am studying Computer Science Engineering"
  },
  {
    question: "Where are you from?",
    answer: "I am from Kashmir"
  }
];

export default function MyAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion-container">
      {accordionData.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h3 className="accordion-header" onClick={() => toggleAccordion(index)}>
            {item.question}
            <span>{activeIndex === index ? "-" : "+"}</span>
          </h3>
          <div className={`accordion-body ${activeIndex === index ? "open" : ""}`}>
            {activeIndex === index && <p>{item.answer}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
