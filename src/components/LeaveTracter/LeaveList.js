import React from 'react';
import { FileText, Calendar } from 'lucide-react';

const LeaveList = ({ leaves, onStatusChange, onDelete, onBack }) => {
  const formatDateRange = (start, end) => {
    if (!start || !end) return '';
    const startDate = new Date(start).toLocaleDateString();
    const endDate = new Date(end).toLocaleDateString();
    return `${startDate} - ${endDate}`;
  };

  return (
    <div className="ll-container">
      <h2 className="ll-section-title">
        <FileText className="ll-section-icon" />
        All Leave Requests
      </h2>
      
      <button onClick={onBack} className="ll-back-button">
        ← Back to Overview
      </button>
      
      {leaves.length === 0 ? (
        <div className="ll-empty-state">
          <Calendar className="ll-empty-icon" />
          <p>No leave requests found.</p>
        </div>
      ) : (
        <div className="ll-leave-table">
          <div className="ll-table-header">
            <div>Employee</div>
            <div>Type</div>
            <div>Dates</div>
            <div>Reason</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          
          {leaves.map(leave => (
            <div key={leave.id} className="ll-table-row">
              <div>{leave.employeeName}</div>
              <div>{leave.leaveType}</div>
              <div>{formatDateRange(leave.startDate, leave.endDate)}</div>
              <div className="ll-reason-cell">{leave.reason}</div>
              <div>
                <span className={`ll-status-badge ll-status-${leave.status}`}>
                  {leave.status}
                </span>
              </div>
              <div className="ll-actions-cell">
                {leave.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => onStatusChange(leave.id, 'approved')}
                      className="ll-approve-btn"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => onStatusChange(leave.id, 'rejected')}
                      className="ll-reject-btn"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button 
                  onClick={() => onDelete(leave.id)}
                  className="ll-delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveList;