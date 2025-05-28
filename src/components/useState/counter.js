// import React, { useState } from "react";

// function Counter() {
//   const [counter, setCounter] = useState(0);

//   return (
//     <div style={{ color: "white", padding: "20px", textAlign: "center" }}>
//       <h1>{counter}</h1>
//       <button onClick={() => setCounter(counter + 1)}>Increment</button>
//       <button onClick={() => setCounter(counter - 1)} style={{ marginLeft: "10px" }}>Decrement</button>
//     </div>
//   );
// }

// export default Counter;

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0); // initial state is 0

  function increment() {
    setCount((prev)=> prev + 1); // update the state
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={increment}>Click me</button>
    </div>
  );
}

