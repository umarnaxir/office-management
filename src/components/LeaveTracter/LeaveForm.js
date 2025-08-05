import React, { useState } from 'react';
import { Plus, User, IdCard, Mail } from 'lucide-react';

const LeaveForm = ({ onSave, onCancel, leaveTypes, currentUser }) => {
  const [formData, setFormData] = useState({
    employeeName: currentUser?.name || '',
    employeeId: currentUser?.id || '',
    employeeEmail: currentUser?.email || '',
    leaveType: leaveTypes[0],
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="lf-container">
      <h2 className="lf-section-title">
        <Plus className="lf-section-icon" />
        Leave Request
      </h2>
      
      <form onSubmit={handleSubmit} className="lf-form">
        <div className="lf-form-row lf-employee-row">
          <div className="lf-form-group with-icon">
            <label>Full Name</label>
            <div className="lf-input-container">
              <User className="lf-input-icon" />
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>
          </div>
          
          <div className="lf-form-group with-icon">
            <label>Employee ID</label>
            <div className="lf-input-container">
              <IdCard className="lf-input-icon" />
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                placeholder="EMP12345"
              />
            </div>
          </div>

          <div className="lf-form-group with-icon">
            <label>Email</label>
            <div className="lf-input-container">
              <Mail className="lf-input-icon" />
              <input
                type="email"
                name="employeeEmail"
                value={formData.employeeEmail}
                onChange={handleChange}
                required
                placeholder="john@company.com"
              />
            </div>
          </div>
        </div>

        <div className="lf-form-row lf-dates-row">
          <div className="lf-form-group">
            <label>Leave Type</label>
            <select 
              name="leaveType" 
              value={formData.leaveType}
              onChange={handleChange}
              required
            >
              {leaveTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="lf-form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="lf-form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="lf-form-group lf-reason-group">
          <label>Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="3"
            required
            placeholder="Brief reason for leave"
          />
        </div>
        
        <div className="lf-form-actions">
          <button type="button" className="lf-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="lf-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveForm;