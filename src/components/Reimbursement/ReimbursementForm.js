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
          <input type="text" name="employeeName" placeholder="Enter your name" value={formData.employeeName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input type="text" name="description" placeholder="Enter a brief description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input type="number" name="amount" placeholder="Enter the amount" value={formData.amount} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category:</label>
        <select type="text" name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="travel">Food</option>
          <option value="food">Tools</option>
          <option value="supplies">Supplies</option>
          <option value="other">Other</option>
        </select>
        </div>

        <div className='form-group'>
          <label>Date:</label>
          <input type="date" name="date" placeholder="Select a date" value={formData.date} onChange={handleChange} required />
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
