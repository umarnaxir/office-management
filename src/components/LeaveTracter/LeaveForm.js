import React, { useState } from 'react';

const LeaveForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ employeeName: '', leaveType: '', fromDate: '', toDate: '', reason: '' });
  };

  return (
    <div className="leave-form">
      <h2>Apply for Leave</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Name:</label>
          <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Leave Type:</label>
          <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
            <option value="">-- Select Leave Type --</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Paid Leave">Paid Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
            <option value="Medical Leave">Medical Leave</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>From Date:</label>
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>To Date:</label>
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Reason:</label>
          <input type="text" name="reason" value={formData.reason} onChange={handleChange} required />
        </div>

        <div className="form-actions">
          <button type="submit">Submit Leave</button>
        </div>
      </form>
    </div>
  );
};

export default LeaveForm;
