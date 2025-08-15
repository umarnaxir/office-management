import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onSave, onCancel, employee, departments, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: departments[0] || '',
    joiningDate: new Date().toISOString().split('T')[0],
    salary: '',
    type: 'full_time',
    position: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        department: employee.department || departments[0] || '',
        joiningDate: employee.joiningDate || new Date().toISOString().split('T')[0],
        salary: employee.salary || '',
        type: employee.type || 'full_time',
        position: employee.position || '',
        email: employee.email || ''
      });
    }
  }, [employee, departments]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.salary || formData.salary <= 0) newErrors.salary = 'Valid salary is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const formatSalaryDisplay = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-IN').format(value);
  };

  return (
    <div className="empmgmt-employee-form">
      <div className="empmgmt-form-header">
        <h2 className="empmgmt-form-title">
          {employee ? 'Edit Employee' : 'Add New Employee'}
        </h2>
        <button 
          className="empmgmt-close-button"
          onClick={onCancel}
          type="button"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="empmgmt-form">
        <div className="empmgmt-form-row">
          <div className="empmgmt-form-group">
            <label className="empmgmt-form-label">
              Full Name
            </label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className={`empmgmt-form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter full name"
            />
            {errors.name && <span className="empmgmt-error-text">{errors.name}</span>}
          </div>
          
          <div className="empmgmt-form-group">
            <label className="empmgmt-form-label">
              Email Address
            </label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className={`empmgmt-form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter email address"
            />
            {errors.email && <span className="empmgmt-error-text">{errors.email}</span>}
          </div>
        </div>
        
        <div className="empmgmt-form-row">
          <div className="empmgmt-form-group">
            <label className="empmgmt-form-label">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="empmgmt-form-input"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div className="empmgmt-form-group">
            <label className="empmgmt-form-label">
              Position
            </label>
            <input 
              name="position" 
              value={formData.position} 
              onChange={handleChange} 
              required 
              className={`empmgmt-form-input ${errors.position ? 'error' : ''}`}
              placeholder="Enter job position"
            />
            {errors.position && <span className="empmgmt-error-text">{errors.position}</span>}
          </div>
        </div>
        
        <div className="empmgmt-form-row">
          <div className="empmgmt-form-group">
            <label className="empmgmt-form-label">
              Employee Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="empmgmt-form-input"
              disabled={!!employee} // Don't allow changing type for existing employees
            >
              <option value="full_time">Full-time Employee</option>
              <option value="intern">Intern</option>
            </select>
          </div>
          
          <div className="empmgmt-form-group">
            <label className="empmgmt-form-label">
              Joining Date
            </label>
            <input 
              type="date" 
              name="joiningDate" 
              value={formData.joiningDate} 
              onChange={handleChange} 
              required 
              className="empmgmt-form-input"
            />
          </div>
        </div>
        
        <div className="empmgmt-form-group">
          <label className="empmgmt-form-label">
            Monthly Salary (INR)
          </label>
          <div className="empmgmt-salary-input-wrapper">
            <span className="empmgmt-currency-symbol">₹</span>
            <input 
              type="number" 
              name="salary" 
              value={formData.salary} 
              onChange={handleChange} 
              required 
              className={`empmgmt-form-input empmgmt-salary-input ${errors.salary ? 'error' : ''}`}
              placeholder="Enter monthly salary"
              min="0"
              step="1000"
            />
          </div>
          {formData.salary && (
            <div className="empmgmt-salary-display">
              Amount in words: ₹{formatSalaryDisplay(formData.salary)}
            </div>
          )}
          {errors.salary && <span className="empmgmt-error-text">{errors.salary}</span>}
        </div>
        
        <div className="empmgmt-form-actions">
          <button 
            type="submit" 
            className="empmgmt-save-button" 
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Employee'}
          </button>
          <button 
            type="button" 
            className="empmgmt-cancel-button" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;