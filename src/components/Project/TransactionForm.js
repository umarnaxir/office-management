'use client';

import React, { useState } from 'react';

const TransactionForm = ({ type, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    party: '',
    type: type
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const getTitle = () => {
    switch(type) {
      case 'expense': return 'Record Office Expense';
      case 'purchase': return 'Record Purchase';
      case 'credit': return 'Record Credit/Loan';
      default: return 'Record Transaction';
    }
  };

  const getFormTypeClass = () => {
    return `transaction-form transaction-form--${type}`;
  };

  const getSubmitButtonClass = () => {
    return `form-button form-button--submit form-button--${type}`;
  };

  return (
    <div className={getFormTypeClass()}>
      <div className="form-header">
        <h2 className="form-title">{getTitle()}</h2>
        <div className={`form-type-indicator form-type-indicator--${type}`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="transaction-form-content">
        <div className="form-group">
          <label className="form-label">Date:</label>
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
            className="form-input form-input--date"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Description:</label>
          <input 
            type="text" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            placeholder="Enter transaction description"
            className="form-input form-input--text"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Amount:</label>
          <div className="amount-input-wrapper">
            <span className="currency-symbol">₹</span>
            <input 
              type="number" 
              name="amount" 
              value={formData.amount} 
              onChange={handleChange} 
              required 
              placeholder="0.00"
              step="0.01"
              min="0"
              className="form-input form-input--amount"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">
            {type === 'expense' ? 'Paid To:' : type === 'purchase' ? 'Purchased From:' : 'Creditor:'}
          </label>
          <input 
            type="text" 
            name="party" 
            value={formData.party} 
            onChange={handleChange} 
            required 
            placeholder={`Enter ${type === 'expense' ? 'payee' : type === 'purchase' ? 'vendor' : 'creditor'} name`}
            className="form-input form-input--text"
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className={getSubmitButtonClass()}
          >
            <span className="button-icon">💾</span>
            Save Transaction
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="form-button form-button--cancel"
          >
            <span className="button-icon">✕</span>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;