import React from 'react';

const OfferLetterList = ({ letters, onDelete }) => {
  return (
    <div className="offer-letter-list">
      <h2>Offer Letters List</h2>

      <table className="table-offer-letter">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Position</th>
            <th>PDF</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {letters.map(letter => (
            <tr key={letter.id}>
              <td>{letter.employeeName}</td>
              <td>{letter.position}</td>
              <td>{letter.pdfFile ? letter.pdfFile.name : 'N/A'}</td>
              <td>
                <button onClick={() => onDelete(letter.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OfferLetterList;
