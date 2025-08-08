import React, { useState, useEffect } from 'react';
import { Save, X, Calculator, Calendar, Tag, FileText, DollarSign } from 'lucide-react';
import { useCreateExpenses } from '../../hooks/useCreateExpenses';

const ExpenseForm = ({ onSave, preSelectedCategory = '' }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: preSelectedCategory,
    description: '',
    amount: '',
    type: 'debit',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createExpense } = useCreateExpenses();

  const categories = [
    'Food Items',
    'Tea/Coffee', 
    'Daily Items',
    'Electricity Bills',
    'Internet Bills',
    'Office Supplies',
    'Maintenance',
    'Transportation',
    'Other'
  ];

  useEffect(() => {
    if (preSelectedCategory) {
      setFormData(prev => ({ ...prev, category: preSelectedCategory }));
    }
  }, [preSelectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.amount) {
      errors.amount = 'Amount is required';
    } else if (isNaN(formData.amount)) {
      errors.amount = 'Amount must be a number';
    } else if (parseFloat(formData.amount) <= 0) {
      errors.amount = 'Amount must be positive';
    }
    if (!formData.type) errors.type = 'Transaction type is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSubmitting) return;
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const expenseData = {
          ...formData,
          amount: parseFloat(formData.amount).toFixed(2),
          description: formData.description.trim(),
        };
        
        await onSave(expenseData);
        
        setFormData({
          date: new Date().toISOString().split('T')[0],
          category: preSelectedCategory,
          description: '',
          amount: '',
          type: 'debit',
        });
      } catch (err) {
        console.error('Submission error:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: preSelectedCategory,
      description: '',
      amount: '',
      type: 'debit',
    });
    setFormErrors({});
  };

  return (
    <div className="expense-form-card">
      <div className="expense-form-header">
        <h2>
          <Calculator className="expense-form-header-icon" />
          Add New Expense
        </h2>
        <p>Track your expenses efficiently</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="expense-form">
        <div className={`expense-form-group ${formErrors.date ? 'expense-error' : ''}`}>
          <label>
            <Calendar size={18} />
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="expense-input"
          />
          {formErrors.date && <span className="expense-error-message">{formErrors.date}</span>}
        </div>

        <div className={`expense-form-group ${formErrors.category ? 'expense-error' : ''}`}>
          <label>
            <Tag size={18} />
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="expense-select"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {formErrors.category && <span className="expense-error-message">{formErrors.category}</span>}
        </div>

        <div className={`expense-form-group ${formErrors.description ? 'expense-error' : ''}`}>
          <label>
            <FileText size={18} />
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter expense details"
            className="expense-input"
          />
          {formErrors.description && <span className="expense-error-message">{formErrors.description}</span>}
        </div>

        <div className={`expense-form-group ${formErrors.amount ? 'expense-error' : ''}`}>
          <label>
            <DollarSign size={18} />
            Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
            className="expense-input"
          />
          {formErrors.amount && <span className="expense-error-message">{formErrors.amount}</span>}
        </div>

        <div className={`expense-form-group ${formErrors.type ? 'expense-error' : ''}`}>
          <label>Transaction Type</label>
          <div className="expense-radio-group">
            <label className="expense-radio-label">
              <input
                type="radio"
                name="type"
                value="debit"
                checked={formData.type === 'debit'}
                onChange={handleChange}
              />
              <span className="expense-radio-custom expense-debit"></span>
              Debit (Expense)
            </label>
            <label className="expense-radio-label">
              <input
                type="radio"
                name="type"
                value="credit"
                checked={formData.type === 'credit'}
                onChange={handleChange}
              />
              <span className="expense-radio-custom expense-credit"></span>
              Credit (Income)
            </label>
          </div>
          {formErrors.type && <span className="expense-error-message">{formErrors.type}</span>}
        </div>

        <div className="expense-form-actions">
          <button 
            type="button" 
            onClick={handleReset}
            className="expense-reset-btn"
            disabled={isSubmitting}
          >
            <X size={18} />
            Reset
          </button>
          <button 
            type="submit" 
            className={`expense-save-btn ${isSubmitting ? 'expense-loading' : ''}`}
            disabled={isSubmitting}
          >
            <Save size={18} />
            {isSubmitting ? 'Saving...' : 'Save Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;