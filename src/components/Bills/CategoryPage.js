import React, { useState } from 'react';
import { Zap, Wifi, User, FileText } from 'lucide-react';
import BillForm from './BillForm';
import BillList from './BillList';

const CategoryPage = ({ category, bills, onAddBill, onStatusChange, onDelete, onDownloadReceipt, onBack }) => {
  const [showForm, setShowForm] = useState(false);

  const categoryInfo = {
    electricity: { title: 'Electricity Bills', icon: Zap, color: '#FFB800' },
    wifi: { title: 'WiFi Bills', icon: Wifi, color: '#2196F3' },
    salary: { title: 'Aunty Salary', icon: User, color: '#4CAF50' },
    others: { title: 'Other Bills', icon: FileText, color: '#9C27B0' }
  };

  const info = categoryInfo[category];
  const IconComponent = info.icon;

  return (
    <div className="category-page">
      <div className="category-header">
        <button onClick={onBack} className="back-btn">← Back</button>
        <div className="category-title">
          <span className="category-icon" style={{ color: info.color }}>
            <IconComponent size={32} />
          </span>
          <h1>{info.title}</h1>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn-primary"
        >
          {showForm ? 'Cancel' : '+ Add Bill'}
        </button>
      </div>

      {showForm && (
        <BillForm 
          category={category}
          onSave={(bill) => {
            onAddBill(bill);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <BillList 
        bills={bills}
        category={category}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onDownloadReceipt={onDownloadReceipt}
      />
    </div>
  );
};

export default CategoryPage;