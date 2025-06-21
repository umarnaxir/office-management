import React from 'react';

const LeaveList = ({ leaves, onStatusChange, onDelete }) => {
  return (
    <div className="leave-list">
      <h2>Leave Applications</h2>

      <table className="table-leaves">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map(l => (
            <tr key={l.id}>
              <td>{l.employeeName}</td>
              <td>{l.leaveType}</td>
              <td>{l.fromDate}</td>
              <td>{l.toDate}</td>
              <td>{l.reason}</td>
              <td>
                <select value={l.status} onChange={(e) => onStatusChange(l.id, e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
              <td>
                <button onClick={() => onDelete(l.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
