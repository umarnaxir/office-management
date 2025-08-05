import React, { useState } from 'react';

const BillForm = ({ onSave, category, onCancel }) => {
  const [formData, setFormData] = useState({
    amount: '',
    dueDate: '',
    description: '',
    provider: '',
    accountNumber: '',
    units: '',
    rate: '',
    salaryMonth: '',
    workDays: '',
    otherType: ''
  });

  const handleSubmit = () => {
    if (!formData.amount || !formData.dueDate) {
      alert('Please fill in required fields');
      return;
    }
    
    onSave({
      ...formData,
      category,
      createdAt: new Date().toISOString()
    });
    
    setFormData({
      amount: '',
      dueDate: '',
      description: '',
      provider: '',
      accountNumber: '',
      units: '',
      rate: '',
      salaryMonth: '',
      workDays: '',
      otherType: ''
    });
  };

  const renderCategoryFields = () => {
    switch(category) {
      case 'electricity':
        return (
          <>
            <input
              type="text"
              placeholder="Electricity Provider"
              value={formData.provider}
              onChange={(e) => setFormData({...formData, provider: e.target.value})}
            />
            <input
              type="text"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
            />
            <input
              type="number"
              placeholder="Units Consumed"
              value={formData.units}
              onChange={(e) => setFormData({...formData, units: e.target.value})}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Rate per Unit"
              value={formData.rate}
              onChange={(e) => setFormData({...formData, rate: e.target.value})}
            />
          </>
        );
      case 'wifi':
        return (
          <>
            <input
              type="text"
              placeholder="Internet Provider"
              value={formData.provider}
              onChange={(e) => setFormData({...formData, provider: e.target.value})}
            />
            <input
              type="text"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
            />
          </>
        );
      case 'salary':
        return (
          <>
            <input
              type="text"
              placeholder="Salary Month (e.g., January 2024)"
              value={formData.salaryMonth}
              onChange={(e) => setFormData({...formData, salaryMonth: e.target.value})}
            />
            <input
              type="number"
              placeholder="Work Days"
              value={formData.workDays}
              onChange={(e) => setFormData({...formData, workDays: e.target.value})}
            />
          </>
        );
      case 'others':
        return (
          <input
            type="text"
            placeholder="Bill Type"
            value={formData.otherType}
            onChange={(e) => setFormData({...formData, otherType: e.target.value})}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bill-form">
      <h3>Add New {category.charAt(0).toUpperCase() + category.slice(1)} Bill</h3>
      <div>
        <div className="form-row">
          <input
            type="number"
            step="0.01"
            placeholder="Amount *"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            required
          />
          <input
            type="date"
            placeholder="Due Date *"
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            required
          />
        </div>
        
        {renderCategoryFields()}
        
        <textarea
          placeholder="Description/Notes"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        
        <div className="form-buttons">
          <button onClick={handleSubmit} className="btn-primary">Add Bill</button>
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BillForm;