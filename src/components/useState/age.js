import { useState } from 'react';

export default function Age() {
  const [age, setAge] = useState(42);

  function increment(amount) {
    setAge(prev => prev + amount);
  }

  return (
    <>
      <h1>Your age: {age}</h1>
      <button onClick={() => increment(5)}>+5</button>
      <button onClick={() => increment(1)}>+1</button>
    </>
  );
}
