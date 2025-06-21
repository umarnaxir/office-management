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
    <div className="employee-form">
      <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Department:</label>
          <input name="department" value={formData.department} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Joining Date:</label>
          <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Salary:</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        </div>

        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
