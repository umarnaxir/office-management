import React, { useState } from 'react';

const PayslipForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    month: '',
    salary: '',
    bonus: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ employeeName: '', month: '', salary: '', bonus: '' });
  };

  return (
    <div className="payslip-form">
      <h2>Generate Payslip</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Name:</label>
          <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Month:</label>
          <input type="month" name="month" value={formData.month} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Salary:</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Bonus:</label>
          <input type="number" name="bonus" value={formData.bonus} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit">Save Payslip</button>
        </div>
      </form>
    </div>
  );
};

export default PayslipForm;
