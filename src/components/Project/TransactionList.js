'use client';

import React from 'react';

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="transaction-list-container">
      <h2 className="transaction-list-title">All Transactions</h2>
      <div className="table-wrapper">
        <table className="transaction-table">
          <thead className="table-header">
            <tr className="header-row">
              <th className="table-cell header-cell date-column">Date</th>
              <th className="table-cell header-cell type-column">Type</th>
              <th className="table-cell header-cell description-column">Description</th>
              <th className="table-cell header-cell amount-column">Amount</th>
              <th className="table-cell header-cell party-column">Party</th>
              <th className="table-cell header-cell actions-column">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {transactions.map(transaction => (
              <tr key={transaction.id} className="table-row">
                <td className="table-cell data-cell date-cell">{transaction.date}</td>
                <td className="table-cell data-cell type-cell">
                  <span className={`type-badge ${transaction.type}-badge`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="table-cell data-cell description-cell">{transaction.description}</td>
                <td className="table-cell data-cell amount-cell">
                  <span className={`amount-value ${transaction.type}-amount`}>
                    ${transaction.amount}
                  </span>
                </td>
                <td className="table-cell data-cell party-cell">{transaction.party}</td>
                <td className="table-cell data-cell actions-cell">
                  <button 
                    className="delete-btn action-button"
                    onClick={() => onDelete(transaction.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;