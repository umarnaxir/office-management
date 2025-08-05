import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus,
  User,
  FileText,
  DollarSign,
  Activity,
  Calendar,
  Upload
} from 'lucide-react';

const ReimbursementForm = ({ addReimbursement, setCurrentView }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    description: '',
    amount: '',
    category: '',
    date: '',
    receiptFile: null
  });
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      setFileName(files[0].name);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReimbursement(formData);
    setFormData({ 
      employeeName: '', 
      description: '', 
      amount: '', 
      category: '', 
      date: '', 
      receiptFile: null 
    });
    setFileName('');
  };

  return (
    <div className="form-container">
      <div className="page-header">
        <button className="back-button" onClick={() => setCurrentView('home')}>
          <ArrowLeft />
          Back to Home
        </button>
        <h1>Submit Reimbursement Request</h1>
      </div>

      <div className="reimbursement-form">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>
                <User className="label-icon" />
                Employee Name
              </label>
              <input 
                type="text" 
                name="employeeName" 
                placeholder="Enter your full name" 
                value={formData.employeeName} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>
                <FileText className="label-icon" />
                Description
              </label>
              <textarea 
                name="description" 
                placeholder="Describe the expense..." 
                value={formData.description} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>
                <DollarSign className="label-icon" />
                Amount
              </label>
              <input 
                type="number" 
                name="amount" 
                placeholder="0.00" 
                step="0.01"
                value={formData.amount} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>
                <Activity className="label-icon" />
                Category
              </label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Category</option>
                <option value="food">Food & Dining</option>
                <option value="travel">Travel & Transport</option>
                <option value="supplies">Office Supplies</option>
                <option value="tools">Tools & Equipment</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <Calendar className="label-icon" />
                Date
              </label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>
                <Upload className="label-icon" />
                Upload Receipt
              </label>
              <div className="file-input-wrapper">
                <input 
                  type="file" 
                  name="receiptFile" 
                  accept="image/*,application/pdf" 
                  onChange={handleChange} 
                  id="receipt-upload"
                />
                <label 
                  htmlFor="receipt-upload" 
                  className={`file-input-label ${fileName ? 'file-selected' : ''}`}
                >
                  <Upload className="upload-icon" />
                  {fileName || 'Choose file or drag here'}
                </label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setCurrentView('home')}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus className="btn-icon" />
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReimbursementForm;