import React from 'react';

const PayslipList = ({ payslips, onDelete }) => {
  return (
    <div className="payslip-list">
      <h2>Payslips List</h2>

      <table className="table-payslip">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Month</th>
            <th>Salary</th>
            <th>Bonus</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {payslips.map(payslip => (
            <tr key={payslip.id}>
              <td>{payslip.employeeName}</td>
              <td>{payslip.month}</td>
              <td>{payslip.salary}</td>
              <td>{payslip.bonus}</td>
              <td>
                <button onClick={() => onDelete(payslip.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayslipList;
