'use client';

import React from 'react';

const EmployeeDetails = ({ employee, onClose }) => {
  return (
    <div className="employee-details">
      <h2>Employee Details</h2>
      <div className="details-container">
        <div className="detail-item">
          <span>Name:</span>
          <span>{employee.name}</span>
        </div>
        <div className="detail-item">
          <span>Position:</span>
          <span>{employee.position}</span>
        </div>
        <div className="detail-item">
          <span>Salary:</span>
          <span>{employee.salary}</span>
        </div>
        <div className="detail-item">
          <span>Join Date:</span>
          <span>{employee.joinDate}</span>
        </div>
        <div className="detail-item">
          <span>Contact:</span>
          <span>{employee.contact}</span>
        </div>
        <div className="detail-item">
          <span>Address:</span>
          <span>{employee.address}</span>
        </div>
        <div className="detail-item">
          <span>Leaves Taken:</span>
          <span>{employee.leaves}</span>
        </div>
        <div className="detail-item">
          <span>Half Days:</span>
          <span>{employee.halfDays}</span>
        </div>
        <div className="detail-item">
          <span>Attendance:</span>
          <span>{employee.attendance}</span>
        </div>
        <div className="detail-item">
          <span>Bonus:</span>
          <span>{employee.bonus}</span>
        </div>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EmployeeDetails;
