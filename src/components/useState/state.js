import { useState } from 'react';

function App() {
  const [fruit, setFruit] = useState('Apple');

  const handleFruit = () => {
    setFruit(prev => prev === "Apple" ? "Banana" : "Apple");
  };

  return (
    <div style={{ color: "white", padding: "20px", marginInlineStart: "20px", textAlign: "center" }}>
      <h1>My favorite fruit is {fruit}</h1>
      <button onClick={handleFruit}>Change Fruit</button>
      <p>Click the button to change the fruit.</p>
      <p>Current fruit: {fruit}</p>
    </div>
  );
}

export default App;
