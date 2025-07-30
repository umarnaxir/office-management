import React from 'react';

const PayslipList = ({ payslips, onDelete, onView }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (payslips.length === 0) {
    return (
      <div className="list-container">
        <h2 className="list-title">Generated Payslips</h2>
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <p className="empty-message">No payslips generated yet.</p>
          <p className="empty-submessage">Create your first payslip using the form.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h2 className="list-title">
        Generated Payslips
        <span className="list-count">({payslips.length})</span>
      </h2>

      <div className="payslip-table-container">
        <table className="payslip-table">
          <thead>
            <tr>
              <th>Employee Details</th>
              <th>Pay Period</th>
              <th>Gross Salary</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payslips.map(payslip => (
              <tr key={payslip.id} className="table-row">
                <td className="employee-cell">
                  <div className="employee-info">
                    <div className="employee-name">{payslip.employeeName}</div>
                    <div className="employee-id">ID: {payslip.employeeId}</div>
                    <div className="employee-designation">{payslip.designation}</div>
                  </div>
                </td>
                <td className="pay-period-cell">
                  <div className="pay-period">{formatDate(payslip.payPeriod)}</div>
                  <div className="pay-date">Paid: {new Date(payslip.payDate).toLocaleDateString('en-IN')}</div>
                </td>
                <td className="amount-cell">
                  <div className="amount-value positive">
                    {formatCurrency(payslip.totalEarnings)}
                  </div>
                </td>
                <td className="amount-cell">
                  <div className="amount-value negative">
                    {formatCurrency(payslip.totalDeductions)}
                  </div>
                </td>
                <td className="amount-cell">
                  <div className="amount-value net-salary">
                    {formatCurrency(payslip.netSalary)}
                  </div>
                </td>
                <td className="actions-cell">
                  <div className="action-buttons">
                    <button
                      onClick={() => onView(payslip)}
                      className="btn btn-view"
                      title="View Payslip"
                    >
                      <span className="btn-icon">👁️</span>
                      View
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete the payslip for ${payslip.employeeName}?`)) {
                          onDelete(payslip.id);
                        }
                      }}
                      className="btn btn-delete"
                      title="Delete Payslip"
                    >
                      <span className="btn-icon">🗑️</span>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-label">Total Payslips</div>
          <div className="stat-value">{payslips.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Salary Disbursed</div>
          <div className="stat-value">
            {formatCurrency(
              payslips.reduce((sum, payslip) => sum + (payslip.netSalary || 0), 0)
            )}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average Salary</div>
          <div className="stat-value">
            {formatCurrency(
              payslips.length > 0 
                ? payslips.reduce((sum, payslip) => sum + (payslip.netSalary || 0), 0) / payslips.length
                : 0
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipList;