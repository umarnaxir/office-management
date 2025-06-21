'use client';

import React, { useState } from 'react';
import TransactionList from '../Project/TransactionList';
import TransactionForm from '../Project/TransactionForm';
import LedgerReport from '../Project/LedgerReport';

const Accounting = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [transactionType, setTransactionType] = useState('expense');

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
    setShowForm(false);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="accounting-container">
      <h1 className="accounting-title">Accounting & Ledger</h1>
      
      <div className="accounting-actions">
        <button 
          className="action-btn expense-btn"
          onClick={() => {
            setTransactionType('expense');
            setShowForm(true);
          }}
        >
          Add Expense
        </button>
        
        <button 
          className="action-btn purchase-btn"
          onClick={() => {
            setTransactionType('purchase');
            setShowForm(true);
          }}
        >
          Record Purchase
        </button>
        
        <button 
          className="action-btn credit-btn"
          onClick={() => {
            setTransactionType('credit');
            setShowForm(true);
          }}
        >
          Record Credit
        </button>
        
        <button 
          className="action-btn report-btn"
          onClick={() => setShowReport(true)}
        >
          View Ledger Report
        </button>
      </div>
      
      {showForm && (
        <div className="form-overlay">
          <TransactionForm 
            type={transactionType}
            onSave={addTransaction}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
      
      <div className="transaction-list-wrapper">
        <TransactionList 
          transactions={transactions} 
          onDelete={deleteTransaction}
        />
      </div>
      
      {showReport && (
        <div className="report-overlay">
          <LedgerReport 
            transactions={transactions}
            onClose={() => setShowReport(false)}
            onPrint={() => window.print()}
          />
        </div>
      )}
    </div>
  );
};

export default Accounting;