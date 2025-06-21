'use client';

import React from 'react';

const LedgerReport = ({ transactions, onClose, onPrint }) => {
  const calculateBalance = () => {
    let balance = 0;
    return transactions.map(t => {
      if (t.type === 'expense' || t.type === 'purchase') {
        balance -= parseFloat(t.amount);
      } else {
        balance += parseFloat(t.amount);
      }
      return { ...t, balance };
    });
  };

  const ledgerEntries = calculateBalance();

  return (
    <div className="ledger-report">
      <h2>Ledger Report</h2>
      <div className="report-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {ledgerEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.type}</td>
                <td>{entry.description}</td>
                <td>{entry.type === 'expense' || entry.type === 'purchase' ? entry.amount : ''}</td>
                <td>{entry.type === 'credit' ? entry.amount : ''}</td>
                <td>{entry.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="report-actions">
        <button onClick={onPrint}>Print Report</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LedgerReport;
