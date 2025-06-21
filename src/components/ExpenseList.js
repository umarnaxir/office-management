import React from 'react';
import { format } from 'date-fns';

const ExpenseList = ({ expenses, onDelete }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMM yyyy');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  if (expenses.length === 0) {
    return (
      <div className="no-expenses">
        <p>No expenses recorded yet. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <div className="list-actions">
        <button onClick={handlePrint} className="print-btn">
          Print Report
        </button>
      </div>

      <div className="table-responsive">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td>{formatDate(expense.date)}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td className="amount-cell">{formatCurrency(expense.amount)}</td>
                <td>
                  <button 
                    onClick={() => onDelete(expense.id)} 
                    className="delete-btn"
                    aria-label={`Delete ${expense.description}`}
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

export default ExpenseList;