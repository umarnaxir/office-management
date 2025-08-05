import React, { useState } from 'react';

const DocumentUploadForm = ({ onSave, selectedEmployee }) => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    uploadFile: null
  });

  const categories = [
    'Employment Contract',
    'Performance Review',
    'Training Certificate',
    'ID Verification',
    'Payroll Documents',
    'Leave Applications',
    'Disciplinary Records',
    'Awards',
    'Resume',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.uploadFile) {
      alert('Please select a file to upload');
      return;
    }
    onSave(formData);
    setFormData({ 
      category: '', 
      description: '',
      uploadFile: null 
    });
  };

  return (
    <div className="doc-manage-upload-form">
      <h2 className="doc-manage-upload-title">Upload New Document</h2>
      {!selectedEmployee && (
        <div className="doc-manage-upload-warning">
          Please select an employee before uploading documents
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="doc-manage-upload-form-container" disabled={!selectedEmployee}>
        <div className="doc-manage-form-group">
          <label htmlFor="doc-manage-category" className="doc-manage-form-label">Category:</label>
          <select
            id="doc-manage-category"
            className="doc-manage-form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="doc-manage-form-group">
          <label htmlFor="doc-manage-description" className="doc-manage-form-label">Description (Optional):</label>
          <textarea
            id="doc-manage-description"
            className="doc-manage-form-textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        <div className="doc-manage-form-group doc-manage-file-upload">
          <label htmlFor="doc-manage-upload-file" className="doc-manage-form-label">Upload File:</label>
          <input
            type="file"
            id="doc-manage-upload-file"
            className="doc-manage-file-input"
            name="uploadFile"
            onChange={handleChange}
            required
          />
          {formData.uploadFile && (
            <div className="doc-manage-file-preview">
              Selected file: {formData.uploadFile.name}
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="doc-manage-upload-btn"
          disabled={!selectedEmployee}
        >
          Upload Document
        </button>
      </form>
    </div>
  );
};

export default DocumentUploadForm;