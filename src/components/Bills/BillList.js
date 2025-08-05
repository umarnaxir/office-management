import React, { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';

const BillList = ({ bills, onStatusChange, onDelete, onDownloadReceipt, category }) => {
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

  return (
    <div className="bill-list">
      <div className="list-header">
        <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Bills</h3>
        <div className="list-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Bills</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="createdAt">Sort by Created</option>
          </select>
        </div>
      </div>

      {filteredBills.length === 0 ? (
        <div className="no-bills">No bills found</div>
      ) : (
        <div className="bills-grid">
          {filteredBills.map(bill => (
            <div key={bill.id} className={`bill-card ${bill.status}`}>
              <div className="bill-card-header">
                <div className="bill-amount">₹{parseFloat(bill.amount).toLocaleString()}</div>
                <div className={`bill-status-badge ${bill.status}`}>
                  {bill.status}
                </div>
              </div>
              
              <div className="bill-details">
                {bill.provider && <p><strong>Provider:</strong> {bill.provider}</p>}
                {bill.accountNumber && <p><strong>Account:</strong> {bill.accountNumber}</p>}
                {bill.units && <p><strong>Units:</strong> {bill.units}</p>}
                {bill.salaryMonth && <p><strong>Month:</strong> {bill.salaryMonth}</p>}
                {bill.workDays && <p><strong>Work Days:</strong> {bill.workDays}</p>}
                {bill.otherType && <p><strong>Type:</strong> {bill.otherType}</p>}
                <p><strong>Due:</strong> {new Date(bill.dueDate).toLocaleDateString()}</p>
                {bill.description && <p><strong>Notes:</strong> {bill.description}</p>}
              </div>

              <div className="bill-actions">
                <button 
                  onClick={() => onStatusChange(bill.id, bill.status === 'paid' ? 'unpaid' : 'paid')}
                  className={`btn-status ${bill.status === 'paid' ? 'btn-unpaid' : 'btn-paid'}`}
                >
                  Mark as {bill.status === 'paid' ? 'Unpaid' : 'Paid'}
                </button>
                <button 
                  onClick={() => onDownloadReceipt(bill)}
                  className="btn-download"
                >
                  <Download size={16} /> Receipt
                </button>
                <button 
                  onClick={() => onDelete(bill.id)}
                  className="btn-delete"
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