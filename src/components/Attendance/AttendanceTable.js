import React from 'react';

const AttendanceTable = ({ records, onDelete }) => {
  return (
    <div className="attmgmt-attendance-table">
      <h2 className="attmgmt-table-title">Attendance Records</h2>
      <table className="attmgmt-table-attendance">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id} className="attmgmt-table-row">
              <td>{record.employeeId}</td>
              <td>{record.employeeName}</td>
              <td>{record.status}</td>
              <td>{record.date}</td>
              <td>
                <button className="attmgmt-delete-button" onClick={() => onDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;