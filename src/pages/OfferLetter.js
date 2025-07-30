import React, { useState } from 'react';
import OfferLetterForm from '../components/OfferLetter/OfferLetterForm';
import OfferLetterList from '../components/OfferLetter/OfferLetterList';

const OfferLetters = () => {
  const [letters, setLetters] = useState([]);

  const addLetter = (letter) => {
    setLetters([...letters, { ...letter, id: Date.now() }]);
  };

  const deleteLetter = (id) => {
    setLetters(letters.filter(l => l.id !== id));
  };

  return (
    <div className="page-offer-letters">
      <h1>Offer Letters</h1>

      <OfferLetterForm onSave={addLetter} />

      <OfferLetterList letters={letters} onDelete={deleteLetter} />
    </div>
  );
};

export default OfferLetters;
