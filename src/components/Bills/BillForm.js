import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, FileText, User, Zap, Wifi } from 'lucide-react';

const BillForm = ({ 
  category, 
  onSave, 
  onCancel, 
  editingBill 
}) => {
  const [formData, setFormData] = useState({
    amount: '',
    dueDate: '',
    description: '',
    provider: '',
    accountNumber: '',
    units: '',
    salaryMonth: '',
    workDays: '',
    otherType: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (editingBill) {
      setFormData({
        amount: editingBill.amount.toString(),
        dueDate: editingBill.dueDate.split('T')[0],
        description: editingBill.description || '',
        provider: editingBill.provider || '',
        accountNumber: editingBill.accountNumber || '',
        units: editingBill.units || '',
        salaryMonth: editingBill.salaryMonth || '',
        workDays: editingBill.workDays || '',
        otherType: editingBill.otherType || ''
      });
    }
  }, [editingBill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.amount || isNaN(formData.amount)) errors.amount = 'Valid amount is required';
    if (!formData.dueDate) errors.dueDate = 'Due date is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const billData = {
      ...formData,
      category,
      amount: parseFloat(formData.amount),
      status: editingBill ? editingBill.status : 'unpaid'
    };

    onSave(billData);
  };

  const renderCategoryFields = () => {
    switch(category) {
      case 'electricity':
        return (
          <>
            <div className="form-group">
              <label><Zap size={16} /> Provider</label>
              <input
                type="text"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                placeholder="Electricity provider"
              />
            </div>
            <div className="form-group">
              <label>Units Consumed</label>
              <input
                type="number"
                name="units"
                value={formData.units}
                onChange={handleChange}
                placeholder="Units"
              />
            </div>
          </>
        );
      case 'wifi':
        return (
          <div className="form-group">
            <label><Wifi size={16} /> Provider</label>
            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              placeholder="Internet provider"
            />
          </div>
        );
      case 'salary':
        return (
          <>
            <div className="form-group">
              <label><User size={16} /> Salary Month</label>
              <input
                type="text"
                name="salaryMonth"
                value={formData.salaryMonth}
                onChange={handleChange}
                placeholder="Month and year (e.g., January 2025)"
              />
            </div>
            <div className="form-group">
              <label>Work Days</label>
              <input
                type="number"
                name="workDays"
                value={formData.workDays}
                onChange={handleChange}
                placeholder="Number of work days"
              />
            </div>
          </>
        );
      case 'others':
        return (
          <div className="form-group">
            <label><FileText size={16} /> Bill Type</label>
            <input
              type="text"
              name="otherType"
              value={formData.otherType}
              onChange={handleChange}
              placeholder="Type of bill"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bill-form-container">
      <h2>{editingBill ? 'Edit Bill' : 'Add New Bill'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className={`form-group ${formErrors.amount ? 'error' : ''}`}>
            <label><DollarSign size={16} /> Amount (₹)</label>
            <input
              type="number"
              name="amount"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
            {formErrors.amount && <span className="error-message">{formErrors.amount}</span>}
          </div>
          <div className={`form-group ${formErrors.dueDate ? 'error' : ''}`}>
            <label><Calendar size={16} /> Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
            {formErrors.dueDate && <span className="error-message">{formErrors.dueDate}</span>}
          </div>
        </div>

        {renderCategoryFields()}

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Additional notes"
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-primary"
          >
            {editingBill ? 'Update Bill' : 'Save Bill'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillForm;