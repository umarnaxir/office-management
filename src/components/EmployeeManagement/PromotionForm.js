import React, { useState } from 'react';

const PromotionForm = ({ employee, onSave, onCancel, loading }) => {
  const [promotionData, setPromotionData] = useState({
    position: '',
    salary: '',
    promotionDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotionData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...promotionData,
      salary: parseFloat(promotionData.salary),
      type: 'full_time'
    });
  };

  return (
    <div className="empmgmt-promotion-form">
      <h3>Promote Intern: {employee.name}</h3>
      <form onSubmit={handleSubmit}>
        <div className="empmgmt-form-group">
          <label>New Position:</label>
          <input
            name="position"
            value={promotionData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="empmgmt-form-group">
          <label>New Salary:</label>
          <input
            type="number"
            name="salary"
            value={promotionData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="empmgmt-form-group">
          <label>Promotion Date:</label>
          <input
            type="date"
            name="promotionDate"
            value={promotionData.promotionDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="empmgmt-form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Promote'}
          </button>
          <button type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;