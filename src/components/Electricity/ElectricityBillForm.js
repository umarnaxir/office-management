import React, { useState } from 'react';

const ElectricityBillForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    month: '',
    amount: '',
    uploadFile: null
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
    setFormData({ month: '', amount: '', uploadFile: null });
  };

  return (
    <div className="electricity-bill-form">
      <h2>Add Electricity Bill</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input type="text" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Upload Bill:</label>
          <input type="file" name="uploadFile" onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit">Add Bill</button>
        </div>
      </form>
    </div>
  );
};

export default ElectricityBillForm;
