import React from 'react';
import { 
  ArrowLeft, 
  Plus,
  Clock, 
  CheckCircle, 
  XCircle, 
  Receipt
} from 'lucide-react';

const ReimbursementList = ({ reimbursements, updateStatus, deleteReimbursement, setCurrentView }) => {
  const conversionRate = 100;

  return (
    <div className="list-container">
      <div className="page-header">
        <button className="back-button" onClick={() => setCurrentView('home')}>
          <ArrowLeft />
          Back to Home
        </button>
        <h1>All Reimbursement Requests</h1>
      </div>

      <div className="reimbursement-list">
        {reimbursements.length === 0 ? (
          <div className="list-empty">
            <Receipt className="empty-icon" />
            <h3>No reimbursements found</h3>
            <p>Start by submitting your first reimbursement request</p>
            <button className="btn-primary" onClick={() => setCurrentView('form')}>
              <Plus className="btn-icon" />
              Add Reimbursement
            </button>
          </div>
        ) : (
          <div className="reimbursement-grid">
            {reimbursements.map(r => (
              <div key={r.id} className="reimbursement-item">
                <div className="item-header">
                  <h3 className="item-title">{r.description}</h3>
                  <div className={`status-badge status-${r.status}`}>
                    {r.status === 'pending' && <Clock className="status-icon" />}
                    {r.status === 'approved' && <CheckCircle className="status-icon" />}
                    {r.status === 'rejected' && <XCircle className="status-icon" />}
                    {r.status}
                  </div>
                </div>

                <div className="item-details">
                  <div className="detail-group">
                    <div className="detail-label">Employee</div>
                    <div className="detail-value">{r.employeeName}</div>
                  </div>

                  <div className="detail-group">
                    <div className="detail-label">Amount</div>
                    <div className="detail-value amount-value">
                      ₹{(parseFloat(r.amount || 0) * conversionRate).toFixed(2)}
                    </div>
                  </div>

                  <div className="detail-group">
                    <div className="detail-label">Category</div>
                    <div className="detail-value" data-category={r.category}>
                      {r.category}
                    </div>
                  </div>

                  <div className="detail-group">
                    <div className="detail-label">Date</div>
                    <div className="detail-value">{r.date}</div>
                  </div>

                  <div className="detail-group">
                    <div className="detail-label">Receipt</div>
                    <div className="detail-value">
                      {r.receiptFile ? r.receiptFile.name : 'No receipt'}
                    </div>
                  </div>
                </div>

                <div className="item-actions">
                  <select 
                    value={r.status} 
                    onChange={(e) => updateStatus(r.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button 
                    onClick={() => deleteReimbursement(r.id)}
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReimbursementList;
