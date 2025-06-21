import React from 'react';

const ReimbursementList = ({ reimbursements, onStatusChange, onDelete }) => {
  return (
    <div className="reimbursement-list">
      <h2>Reimbursement Requests</h2>

      <table className="table-reimbursement">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Receipt</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reimbursements.map(r => (
            <tr key={r.id}>
              <td>{r.employeeName}</td>
              <td>{r.description}</td>
              <td>{r.amount}</td>
              <td>{r.receiptFile ? r.receiptFile.name : 'N/A'}</td>
              <td>
                <select value={r.status} onChange={(e) => onStatusChange(r.id, e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
              <td>
                <button onClick={() => onDelete(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReimbursementList;
