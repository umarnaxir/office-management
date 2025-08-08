import React from "react";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Receipt,
  TrendingUp,
  Activity,
} from "lucide-react";

const HomePage = ({ reimbursements, setCurrentView }) => {
  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Calculate statistics
  const stats = {
    total: reimbursements.length,
    pending: reimbursements.filter((r) => r.status === "pending").length,
    approved: reimbursements.filter((r) => r.status === "approved").length,
    rejected: reimbursements.filter((r) => r.status === "rejected").length,
    totalAmount: reimbursements.reduce(
      (sum, r) => sum + parseFloat(r.amount || 0),
      0
    ),
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="header-content">
          <h1 className="main-title">
            <Receipt className="title-icon" />
            Reimbursement Management
          </h1>
          <p className="subtitle">Streamline your expense management process</p>
        </div>
      </div>

      <div className="quick-actions">
        <button
          className="action-card primary"
          onClick={() => setCurrentView("form")}
        >
          <Plus className="action-icon" />
          <div className="action-content">
            <h3>Add Reimbursement</h3>
            <p>Submit a new expense request</p>
          </div>
        </button>

        <button
          className="action-card secondary"
          onClick={() => setCurrentView("list")}
        >
          <FileText className="action-icon" />
          <div className="action-content">
            <h3>View All Requests</h3>
            <p>Manage existing reimbursements</p>
          </div>
        </button>
      </div>

      <div className="stats-section">
        <h2 className="section-title">
          <TrendingUp className="section-icon" />
          Overview & Statistics
        </h2>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total">
              <Activity />
            </div>
            <div className="stat-content">
              <h3>{stats.total}</h3>
              <p>Total Requests</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending">
              <Clock />
            </div>
            <div className="stat-content">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon approved">
              <CheckCircle />
            </div>
            <div className="stat-content">
              <h3>{stats.approved}</h3>
              <p>Approved</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon rejected">
              <XCircle />
            </div>
            <div className="stat-content">
              <h3>{stats.rejected}</h3>
              <p>Rejected</p>
            </div>
          </div>

          <div className="stat-card amount">
            <div className="stat-icon amount">
              <Receipt />
            </div>
            <div className="stat-content">
              <h3>{formatIndianCurrency(stats.totalAmount)}</h3>
              <p>Total Amount</p>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h2 className="section-title">
          <Clock className="section-icon" />
          Recent Activity
        </h2>

        <div className="recent-list">
          {reimbursements.slice(0, 3).map((item) => (
            <div key={item.id} className="recent-item">
              <div className="recent-icon">
                <Receipt />
              </div>
              <div className="recent-content">
                <h4>{item.description}</h4>
                <p>
                  {item.employeeName} • {formatIndianCurrency(parseFloat(item.amount))}
                </p>
              </div>
              <div className={`status-badge status-${item.status}`}>
                {item.status}
              </div>
            </div>
          ))}

          {reimbursements.length === 0 && (
            <div className="empty-state">
              <Receipt className="empty-icon" />
              <p>No reimbursements yet. Start by adding your first request!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
