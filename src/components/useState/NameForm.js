import { useState } from 'react';

export default function NameForm() {
  const [name, setName] = useState('');

  function handleChange(e) {
    setName(e.target.value); // update name with input value
  }

  return (
    <div>
      <input type="text" value={name} onChange={handleChange} />
      <p>Your name is: {name}</p>
    </div>
  );
}
