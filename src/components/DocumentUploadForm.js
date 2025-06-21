import React, { useState } from 'react';

const DocumentUploadForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    category: '',
    uploadFile: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ category: '', uploadFile: null });
  };

  return (
    <div className="document-upload-form">
      <h2>Upload Document</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Upload File:</label>
          <input type="file" name="uploadFile" onChange={handleChange} required />
        </div>

        <div className="form-actions">
          <button type="submit">Upload Document</button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUploadForm;
