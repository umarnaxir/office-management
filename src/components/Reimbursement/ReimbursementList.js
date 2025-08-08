import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Plus,
  Clock, 
  CheckCircle, 
  XCircle, 
  Receipt,
  Trash2
} from 'lucide-react';
import { fetchReimbursements, deleteReimbursement } from '../../services/reimburseServices';
import { useUpdateReimburse } from '../../hooks/useUpdateReimburse';

const ReimbursementList = ({ setCurrentView }) => {
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState({});
  const { updateReimbursementData, loading: updateLoading, error: updateError } = useUpdateReimburse();

  useEffect(() => {
    loadReimbursements();
  }, []);

  const loadReimbursements = async () => {
    try {
      setLoading(true);
      const data = await fetchReimbursements();
      console.log('Fetched reimbursements:', data);
      setReimbursements(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load reimbursements:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await updateReimbursementData(id, { status: newStatus });
      // Update local state to reflect the change
      setReimbursements(prev => prev.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reimbursement?')) {
      return;
    }

    try {
      setDeleteLoading(prev => ({ ...prev, [id]: true }));
      await deleteReimbursement(id);
      
      // Remove from local state
      setReimbursements(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Failed to delete reimbursement:", err);
      setError("Failed to delete reimbursement: " + err.message);
    } finally {
      setDeleteLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const formatAmount = (amount) => {
    const numAmount = parseFloat(amount || 0);
    return `₹${numAmount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (err) {
      return dateString;
    }
  };

  const getCategoryLabel = (category) => {
    const categoryMap = {
      'food': 'Food & Dining',
      'travel': 'Travel & Transport',
      'supplies': 'Office Supplies',
      'tools': 'Tools & Equipment',
      'other': 'Other'
    };
    return categoryMap[category] || category;
  };

  if (loading) return <div className="loading-message">Loading reimbursements...</div>;
  if (error) return (
    <div className="error-container">
      <div className="error-message">{error}</div>
      <button onClick={loadReimbursements} className="btn-secondary">Retry</button>
    </div>
  );

  return (
    <div className="list-container">
      <div className="page-header">
        <button className="back-button" onClick={() => setCurrentView('home')}>
          <ArrowLeft />
          Back to Home
        </button>
        <h1>All Reimbursement Requests</h1>
        <button className="btn-primary" onClick={() => setCurrentView('form')}>
          <Plus className="btn-icon" />
          Add New
        </button>
      </div>

      {updateError && <div className="error-message">{updateError}</div>}

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
                      {formatAmount(r.amount)}
                    </div>
                  </div>

                  <div className="detail-group">
                    <div className="detail-label">Category</div>
                    <div className="detail-value" data-category={r.category}>
                      {getCategoryLabel(r.category)}
                    </div>
                  </div>

                  <div className="detail-group">
                    <div className="detail-label">Date</div>
                    <div className="detail-value">{formatDate(r.date)}</div>
                  </div>

                  <div className="detail-group">
                    <div className="detail-label">Receipt</div>
                    <div className="detail-value">
                      {r.receiptFile?.name || 'No receipt'}
                    </div>
                  </div>

                  {r.createdAt && (
                    <div className="detail-group">
                      <div className="detail-label">Submitted</div>
                      <div className="detail-value">{formatDate(r.createdAt)}</div>
                    </div>
                  )}
                </div>

                <div className="item-actions">
                  <select 
                    value={r.status} 
                    onChange={(e) => updateStatus(r.id, e.target.value)}
                    className="status-select"
                    disabled={updateLoading}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button 
                    onClick={() => handleDelete(r.id)}
                    className="btn-danger"
                    disabled={deleteLoading[r.id] || updateLoading}
                    title="Delete reimbursement"
                  >
                    {deleteLoading[r.id] ? (
                      'Deleting...'
                    ) : (
                      <>
                        <Trash2 size={16} />
                        Delete
                      </>
                    )}
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