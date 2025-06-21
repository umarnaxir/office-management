'use client';

import React from 'react';

const SalaryReceipt = ({ employee, onClose, onPrint }) => {
  const calculateNetSalary = () => {
    const basicSalary = parseFloat(employee.salary) || 0;
    const bonus = parseFloat(employee.bonus) || 0;
    const leavesDeduction = (parseFloat(employee.leaves) || 0) * (basicSalary / 30);
    const halfDayDeduction = (parseFloat(employee.halfDays) || 0) * (basicSalary / 60);
    
    return basicSalary + bonus - leavesDeduction - halfDayDeduction;
  };

  return (
    <div className="salary-receipt">
      <h2>Salary Receipt</h2>
      <div className="receipt-container">
        <div className="receipt-header">
          <h3>Company Name</h3>
          <p>Salary Month: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
        </div>
        
        <div className="employee-info">
          <p><strong>Employee ID:</strong> {employee.id}</p>
          <p><strong>Employee Name:</strong> {employee.name}</p>
          <p><strong>Designation:</strong> {employee.position}</p>
        </div>
        
        <div className="salary-details">
          <table>
            <tbody>
              <tr>
                <td>Basic Salary</td>
                <td>{employee.salary}</td>
              </tr>
              <tr>
                <td>Bonus</td>
                <td>{employee.bonus}</td>
              </tr>
              <tr>
                <td>Leaves Deduction ({employee.leaves} days)</td>
                <td>-{(employee.leaves || 0) * (employee.salary / 30)}</td>
              </tr>
              <tr>
                <td>Half Days Deduction ({employee.halfDays} days)</td>
                <td>-{(employee.halfDays || 0) * (employee.salary / 60)}</td>
              </tr>
              <tr className="total">
                <td>Net Salary</td>
                <td>{calculateNetSalary()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="receipt-footer">
          <p>Date: {new Date().toLocaleDateString()}</p>
          <p>Authorized Signature</p>
        </div>
      </div>
      
      <div className="receipt-actions">
        <button onClick={onPrint}>Print Receipt</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SalaryReceipt;
