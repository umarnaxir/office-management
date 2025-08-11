import React, { useState } from 'react';
import { User, IdCard, Mail, Calendar as CalendarIcon } from 'lucide-react';

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

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.employeeName) errors.employeeName = 'Name is required';
    if (!formData.employeeId) errors.employeeId = 'Employee ID is required';
    if (!formData.employeeEmail) errors.employeeEmail = 'Email is required';
    if (!formData.startDate) errors.startDate = 'Start date is required';
    if (!formData.endDate) errors.endDate = 'End date is required';
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      errors.endDate = 'End date must be after start date';
    }
    if (!formData.reason) errors.reason = 'Reason is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSave(formData);
  };

  return (
    <div className="lf-container">
      <h2 className="lf-section-title">
        <CalendarIcon className="lf-section-icon" />
        Leave Request
      </h2>
      
      <form onSubmit={handleSubmit} className="lf-form">
        <div className="lf-form-row lf-employee-row">
          <div className={`lf-form-group with-icon ${formErrors.employeeName ? 'error' : ''}`}>
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
            {formErrors.employeeName && <span className="error-message">{formErrors.employeeName}</span>}
          </div>
          
          <div className={`lf-form-group with-icon ${formErrors.employeeId ? 'error' : ''}`}>
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
            {formErrors.employeeId && <span className="error-message">{formErrors.employeeId}</span>}
          </div>

          <div className={`lf-form-group with-icon ${formErrors.employeeEmail ? 'error' : ''}`}>
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
            {formErrors.employeeEmail && <span className="error-message">{formErrors.employeeEmail}</span>}
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
          
          <div className={`lf-form-group ${formErrors.startDate ? 'error' : ''}`}>
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
            {formErrors.startDate && <span className="error-message">{formErrors.startDate}</span>}
          </div>
          
          <div className={`lf-form-group ${formErrors.endDate ? 'error' : ''}`}>
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
            {formErrors.endDate && <span className="error-message">{formErrors.endDate}</span>}
          </div>
        </div>
        
        <div className={`lf-form-group lf-reason-group ${formErrors.reason ? 'error' : ''}`}>
          <label>Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="3"
            required
            placeholder="Brief reason for leave"
          />
          {formErrors.reason && <span className="error-message">{formErrors.reason}</span>}
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