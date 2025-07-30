import React from 'react';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="empmgmt-employee-list">
      <h2 className="empmgmt-list-title">Employee List</h2>
      <table className="empmgmt-table-employee">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Joining Date</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="empmgmt-table-row">
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.joiningDate}</td>
              <td>${emp.salary}</td>
              <td>
                <button className="empmgmt-edit-button" onClick={() => onEdit(emp)}>Edit</button>
                <button className="empmgmt-delete-button" onClick={() => onDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;