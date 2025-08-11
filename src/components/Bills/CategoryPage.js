import React, { useState } from 'react';
import { Zap, Wifi, User, FileText } from 'lucide-react';
import BillForm from './BillForm';
import BillList from './BillList';

const CategoryPage = ({ 
  category, 
  bills, 
  onAddBill, 
  onEdit,
  onStatusChange, 
  onDelete, 
  onDownloadReceipt, 
  onBack,
  editingBill,
  setEditingBill
}) => {
  const [showForm, setShowForm] = useState(false);

  const categoryInfo = {
    electricity: { title: 'Electricity Bills', icon: Zap, color: '#FFB800' },
    wifi: { title: 'WiFi Bills', icon: Wifi, color: '#2196F3' },
    salary: { title: 'Aunty Salary', icon: User, color: '#4CAF50' },
    others: { title: 'Other Bills', icon: FileText, color: '#9C27B0' }
  };

  const info = categoryInfo[category];
  const IconComponent = info.icon;

  const handleSave = async (billData) => {
    const isEditMode = !!editingBill;
    const success = isEditMode 
      ? await onEdit({ ...billData, id: editingBill.id }) 
      : await onAddBill(billData);

    if (success) {
      setEditingBill(null);
      setShowForm(false);
    }
  };

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
          onClick={() => {
            setEditingBill(null);
            setShowForm(!showForm);
          }} 
          className="btn-primary"
        >
          {showForm || editingBill ? 'Cancel' : '+ Add Bill'}
        </button>
      </div>

      {(showForm || editingBill) && (
        <BillForm 
          category={category}
          onSave={handleSave}
          onCancel={() => {
            setEditingBill(null);
            setShowForm(false);
          }}
          editingBill={editingBill}
        />
      )}

      <BillList 
        bills={bills}
        category={category}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onDownloadReceipt={onDownloadReceipt}
        setEditingBill={(bill) => {
          setEditingBill(bill);
          setShowForm(true);
        }}
      />
    </div>
  );
};

export default CategoryPage;