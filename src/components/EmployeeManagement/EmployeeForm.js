import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onSave, onCancel, employee }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    joiningDate: '',
    salary: ''
  });

  useEffect(() => {
    if (employee) setFormData(employee);
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: employee ? employee.id : Date.now() });
  };

  return (
    <div className="empmgmt-employee-form">
      <h2 className="empmgmt-form-title">{employee ? 'Edit Employee' : 'Add Employee'}</h2>
      <div>
        <div className="empmgmt-form-group">
          <label className="empmgmt-form-label">Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} required className="empmgmt-form-input" />
        </div>
        <div className="empmgmt-form-group">
          <label className="empmgmt-form-label">Department:</label>
          <input name="department" value={formData.department} onChange={handleChange} required className="empmgmt-form-input" />
        </div>
        <div className="empmgmt-form-group">
          <label className="empmgmt-form-label">Joining Date:</label>
          <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required className="empmgmt-form-input" />
        </div>
        <div className="empmgmt-form-group">
          <label className="empmgmt-form-label">Salary:</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required className="empmgmt-form-input" />
        </div>
        <div className="empmgmt-form-actions">
          <button type="submit" className="empmgmt-save-button" onClick={handleSubmit}>Save</button>
          <button type="button" className="empmgmt-cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;