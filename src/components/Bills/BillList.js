import React, { useState } from 'react';
import { Download, Trash2, CheckCircle, Clock, Edit } from 'lucide-react';
import { format } from 'date-fns';

const BillList = ({ 
  bills, 
  category, 
  onStatusChange, 
  onDelete, 
  onDownloadReceipt, 
  setEditingBill
}) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const filteredBills = bills
    .filter(bill => bill.category === category)
    .filter(bill => filter === 'all' || bill.status === filter)
    .sort((a, b) => {
      if (sortBy === 'amount') return parseFloat(b.amount) - parseFloat(a.amount);
      if (sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMM yyyy');
  };

  return (
    <div className="bill-list-container">
      <div className="list-controls">
        <div className="filter-control">
          <label>Filter:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Bills</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        <div className="sort-control">
          <label>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate">Due Date</option>
            <option value="amount">Amount</option>
            <option value="createdAt">Date Added</option>
          </select>
        </div>
      </div>

      {filteredBills.length === 0 ? (
        <div className="empty-state">
          <p>No bills found for this category</p>
        </div>
      ) : (
        <div className="bills-grid">
          {filteredBills.map(bill => (
            <div key={bill.id} className={`bill-card ${bill.status}`}>
              <div className="bill-header">
                <div className="bill-amount">{formatCurrency(bill.amount)}</div>
                <div className="bill-status">
                  {bill.status === 'paid' ? (
                    <CheckCircle size={18} className="paid-icon" />
                  ) : (
                    <Clock size={18} className="unpaid-icon" />
                  )}
                  <span>{bill.status}</span>
                </div>
              </div>

              <div className="bill-details">
                <div className="detail-row">
                  <span className="detail-label">Due Date:</span>
                  <span className="detail-value">{formatDate(bill.dueDate)}</span>
                </div>

                {bill.provider && (
                  <div className="detail-row">
                    <span className="detail-label">Provider:</span>
                    <span className="detail-value">{bill.provider}</span>
                  </div>
                )}

                {bill.description && (
                  <div className="detail-row description">
                    <span className="detail-label">Notes:</span>
                    <span className="detail-value">{bill.description}</span>
                  </div>
                )}
              </div>

              <div className="bill-actions">
                <button
                  onClick={() => onStatusChange(bill.id, bill.status)}
                  className={`status-btn ${bill.status === 'paid' ? 'unpaid-btn' : 'paid-btn'}`}
                >
                  {bill.status === 'paid' ? 'Mark Unpaid' : 'Mark Paid'}
                </button>
                <button
                  onClick={() => onDownloadReceipt(bill)}
                  className="download-btn"
                >
                  <Download size={16} /> Receipt
                </button>
                <button
                  onClick={() => setEditingBill(bill)}
                  className="edit-btn"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => onDelete(bill.id)}
                  className="delete-btn"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BillList;