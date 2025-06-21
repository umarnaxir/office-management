'use client';

import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onSave, onCancel, employee }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    salary: '',
    joinDate: '',
    contact: '',
    address: '',
    leaves: 0,
    halfDays: 0,
    attendance: 0,
    bonus: 0
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="employee-form">
      <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Position:</label>
          <input 
            type="text" 
            name="position" 
            value={formData.position} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Salary:</label>
          <input 
            type="number" 
            name="salary" 
            value={formData.salary} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Join Date:</label>
          <input 
            type="date" 
            name="joinDate" 
            value={formData.joinDate} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-group">
          <label>Contact:</label>
          <input 
            type="text" 
            name="contact" 
            value={formData.contact} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-group">
          <label>Address:</label>
          <textarea 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-group">
          <label>Leaves:</label>
          <input 
            type="number" 
            name="leaves" 
            value={formData.leaves} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-group">
          <label>Half Days:</label>
          <input 
            type="number" 
            name="halfDays" 
            value={formData.halfDays} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-group">
          <label>Attendance:</label>
          <input 
            type="number" 
            name="attendance" 
            value={formData.attendance} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-group">
          <label>Bonus:</label>
          <input 
            type="number" 
            name="bonus" 
            value={formData.bonus} 
            onChange={handleChange} 
          />
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
