import React, { useState } from 'react';

const ReimbursementForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    description: '',
    amount: '',
    receiptFile: null
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
    setFormData({ employeeName: '', description: '', amount: '', receiptFile: null });
  };

  return (
    <div className="reimbursement-form">
      <h2>Submit Reimbursement</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Name:</label>
          <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Upload Receipt:</label>
          <input type="file" name="receiptFile" accept="image/*,application/pdf" onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReimbursementForm;
