'use client';

import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, onCancel, task }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: '',
    priority: 'medium'
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="task-form">
      <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-group">
          <label>Assigned To:</label>
          <input 
            type="text" 
            name="assignedTo" 
            value={formData.assignedTo} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Deadline:</label>
          <input 
            type="date" 
            name="deadline" 
            value={formData.deadline} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Priority:</label>
          <select 
            name="priority" 
            value={formData.priority} 
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
