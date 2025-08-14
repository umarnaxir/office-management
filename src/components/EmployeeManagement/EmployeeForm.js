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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="empmgmt-employee-form">
      <h2 className="empmgmt-form-title">{employee ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="empmgmt-form-group">
          <label className="empmgmt-form-label">Name:</label>
          <input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="empmgmt-form-input" 
          />
        </div>
        
        <div className="empmgmt-form-group">
          <label className="empmgmt-form-label">Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="empmgmt-form-input" 
          />
        </div>
        
        <div className="empmgmt-form-group">
          <label className="empmgmt-form-label">Department:</label>
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
          <label className="empmgmt-form-label">Position:</label>
          <input 
            name="position" 
            value={formData.position} 
            onChange={handleChange} 
            required 
            className="empmgmt-form-input" 
          />
        </div>
        
        <div className="empmgmt-form-group">
          <label className="empmgmt-form-label">Employee Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="empmgmt-form-input"
            disabled={!!employee} // Don't allow changing type for existing employees
          >
            <option value="full_time">Full-time</option>
            <option value="intern">Intern</option>
          </select>
        </div>
        
        <div className="empmgmt-form-group">
          <label className="empmgmt-form-label">Joining Date:</label>
          <input 
            type="date" 
            name="joiningDate" 
            value={formData.joiningDate} 
            onChange={handleChange} 
            required 
            className="empmgmt-form-input" 
          />
        </div>
        
        <div className="empmgmt-form-group">
          <label className="empmgmt-form-label">Salary:</label>
          <input 
            type="number" 
            name="salary" 
            value={formData.salary} 
            onChange={handleChange} 
            required 
            className="empmgmt-form-input" 
          />
        </div>
        
        <div className="empmgmt-form-actions">
          <button 
            type="submit" 
            className="empmgmt-save-button" 
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
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