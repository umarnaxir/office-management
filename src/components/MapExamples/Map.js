import React from 'react';

function FruitList() {
  const fruits = ["Apple", "Banana", "Mango"];

  function createFruitItem(fruit, index) {
    return <li key={index}>{fruit}</li>;
  }

  const fruitItems = fruits.map(createFruitItem);

  return (
    <ul>
      {fruitItems}
    </ul>
  );
}

export default FruitList;
 