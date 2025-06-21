import React from 'react';

const AttendanceTable = ({ records, onDelete }) => {
  return (
    <div className="attendance-table">
      <h2>Attendance Records</h2>

      <table className="table-attendance">
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.employeeName}</td>
              <td>{record.status}</td>
              <td>
                <button onClick={() => onDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
