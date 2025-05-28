import React, { useState } from 'react';

function NameList() {
  const [names, setNames] = useState(['Umar', 'Owais', 'Khalid']);
  const [newName, setNewName] = useState('');

  const addName = () => {
    if (newName.trim() !== '') {
      setNames([...names, newName]);
      setNewName('');
    }
  };

  return (
    <div>
      <h2>Name List</h2>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter new name"
      />
      <button onClick={addName}>Add Name</button>
    </div>
  );
}

export default NameList;
