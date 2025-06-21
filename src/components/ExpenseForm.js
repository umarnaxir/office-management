import React, { useState } from 'react';

const ExpenseForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.amount) errors.amount = 'Amount is required';
    if (isNaN(formData.amount)) errors.amount = 'Amount must be a number';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        amount: parseFloat(formData.amount).toFixed(2)
      });
      setFormData({
        date: new Date().toISOString().split('T')[0],
        category: '',
        description: '',
        amount: ''
      });
    }
  };

  return (
    <div className="expense-form-card">
      <h2>Add New Expense</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className={`form-group ${formErrors.date ? 'error' : ''}`}>
          <label>Date:</label>
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
          />
          {formErrors.date && <span className="error-message">{formErrors.date}</span>}
        </div>

        <div className={`form-group ${formErrors.category ? 'error' : ''}`}>
          <label>Category:</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Category</option>
            <option value="Food Items">Food Items</option>
            <option value="Tea/Coffee">Tea/Coffee</option>
            <option value="Daily Items">Daily Items</option>
            <option value="Electricity Bills">Electricity Bills</option>
            <option value="Internet Bills">Internet Bills</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Transportation">Transportation</option>
            <option value="Other">Other</option>
          </select>
          {formErrors.category && <span className="error-message">{formErrors.category}</span>}
        </div>

        <div className={`form-group ${formErrors.description ? 'error' : ''}`}>
          <label>Description:</label>
          <input 
            type="text" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            placeholder="Enter expense details"
          />
          {formErrors.description && <span className="error-message">{formErrors.description}</span>}
        </div>

        <div className={`form-group ${formErrors.amount ? 'error' : ''}`}>
          <label>Amount (₹):</label>
          <input 
            type="number" 
            name="amount" 
            value={formData.amount} 
            onChange={handleChange} 
            required 
            min="0"
            step="0.01"
            placeholder="0.00"
          />
          {formErrors.amount && <span className="error-message">{formErrors.amount}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            Save Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;