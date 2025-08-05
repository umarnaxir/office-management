import React from 'react';
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Activity,
  AlertCircle,
  Calendar
} from 'lucide-react';

const LeaveTrackerHome = ({ leaves, setCurrentView }) => {
  const stats = {
    total: leaves.length,
    pending: leaves.filter(l => l.status === 'pending').length,
    approved: leaves.filter(l => l.status === 'approved').length,
    rejected: leaves.filter(l => l.status === 'rejected').length,
    upcoming: leaves.filter(l => new Date(l.startDate) > new Date()).length,
  };

  return (
    <>
      <div className="lt-quick-actions">
        <button
          className="lt-action-card lt-primary"
          onClick={() => setCurrentView("form")}
        >
          <Plus className="lt-action-icon" />
          <div className="lt-action-content">
            <h3>Request Leave</h3>
            <p>Submit a new leave request</p>
          </div>
        </button>

        <button
          className="lt-action-card lt-secondary"
          onClick={() => setCurrentView("list")}
        >
          <FileText className="lt-action-icon" />
          <div className="lt-action-content">
            <h3>View All Requests</h3>
            <p>Manage your leave history</p>
          </div>
        </button>
      </div>
      
      <div className="lt-stats-section">
        <h2 className="lt-section-title">
          <TrendingUp className="lt-section-icon" />
          Leave Overview
        </h2>

        <div className="lt-stats-grid">
          <div className="lt-stat-card">
            <div className="lt-stat-icon lt-total">
              <Activity />
            </div>
            <div className="lt-stat-content">
              <h3>{stats.total}</h3>
              <p>Total Requests</p>
            </div>
          </div>

          <div className="lt-stat-card">
            <div className="lt-stat-icon lt-pending">
              <Clock />
            </div>
            <div className="lt-stat-content">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>

          <div className="lt-stat-card">
            <div className="lt-stat-icon lt-approved">
              <CheckCircle />
            </div>
            <div className="lt-stat-content">
              <h3>{stats.approved}</h3>
              <p>Approved</p>
            </div>
          </div>

          <div className="lt-stat-card">
            <div className="lt-stat-icon lt-rejected">
              <XCircle />
            </div>
            <div className="lt-stat-content">
              <h3>{stats.rejected}</h3>
              <p>Rejected</p>
            </div>
          </div>

          {/* <div className="lt-stat-card">
            <div className="lt-stat-icon lt-upcoming">
              <AlertCircle />
            </div>
            <div className="lt-stat-content">
              <h3>{stats.upcoming}</h3>
              <p>Upcoming</p>
            </div>
          </div> */}
        </div>
      </div>
      
      <div className="lt-recent-section">
        <h2 className="lt-section-title">
          <Clock className="lt-section-icon" />
          Recent Leave Requests
        </h2>

        <div className="lt-recent-list">
          {leaves.slice(0, 3).map((item) => (
            <div key={item.id} className="lt-recent-item">
              <div className="lt-recent-icon">
                <Calendar />
              </div>
              <div className="lt-recent-content">
                <h4>{item.leaveType} Leave</h4>
                <p>
                  {item.employeeName} • {formatDateRange(item.startDate, item.endDate)}
                </p>
              </div>
              <div className={`lt-status-badge lt-status-${item.status}`}>
                {item.status}
              </div>
            </div>
          ))}

          {leaves.length === 0 && (
            <div className="lt-empty-state">
              <Calendar className="lt-empty-icon" />
              <p>No leave requests yet. Start by adding your first request!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

function formatDateRange(start, end) {
  if (!start || !end) return '';
  const startDate = new Date(start).toLocaleDateString();
  const endDate = new Date(end).toLocaleDateString();
  return `${startDate} - ${endDate}`;
}

export default LeaveTrackerHome;