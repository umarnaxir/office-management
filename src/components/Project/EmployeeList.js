'use client';

import React from 'react';

const EmployeeList = ({ employees, onSelect, onEdit, onDelete, onGenerateReceipt }) => {
  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>
              <td>
                <button onClick={() => onSelect(employee)}>View</button>
                <button onClick={() => onEdit(employee)}>Edit</button>
                <button onClick={() => onDelete(employee.id)}>Delete</button>
                <button onClick={() => onGenerateReceipt(employee)}>Salary Receipt</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
