import React from 'react';

const ElectricityBillList = ({ bills, onStatusChange, onDelete }) => {
  return (
    <div className="electricity-bill-list">
      <h2>Electricity Bills</h2>

      <table className="table-electricity-bills">
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
            <th>Bill File</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bills.map(b => (
            <tr key={b.id}>
              <td>{b.month}</td>
              <td>{b.amount}</td>
              <td>{b.uploadFile ? b.uploadFile.name : 'N/A'}</td>
              <td>
                <select value={b.status} onChange={(e) => onStatusChange(b.id, e.target.value)}>
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </td>
              <td>
                <button onClick={() => onDelete(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ElectricityBillList;
