import React, { useState } from 'react';

const OfferLetterForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    position: '',
    pdfFile: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ employeeName: '', position: '', pdfFile: null });
  };

  return (
    <div className="offer-letter-form">
      <h2>Add Offer Letter</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Name:</label>
          <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Position:</label>
          <input type="text" name="position" value={formData.position} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Upload PDF:</label>
          <input type="file" name="pdfFile" accept="application/pdf" onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit">Save Letter</button>
        </div>
      </form>
    </div>
  );
};

export default OfferLetterForm;
