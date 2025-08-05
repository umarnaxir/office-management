import React from 'react';

const ExpenseSummary = ({ expenses }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const totalDebit = expenses
    .filter(exp => exp.type === 'debit')
    .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  const totalCredit = expenses
    .filter(exp => exp.type === 'credit')
    .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  const netBalance = totalCredit - totalDebit;

  const categoryTotals = expenses.reduce((acc, expense) => {
    const key = `${expense.category}_${expense.type}`;
    if (!acc[key]) {
      acc[key] = { category: expense.category, type: expense.type, total: 0 };
    }
    acc[key].total += parseFloat(expense.amount);
    return acc;
  }, {});

  const categoryBreakdown = Object.values(categoryTotals);

  return (
    <div className="expense-summary-card">
      <h3>Expense Summary</h3>

      <div className="expense-summary-total">
        <h4>Total Debit</h4>
        <p className="expense-total-amount">{formatCurrency(totalDebit)}</p>
      </div>

      <div className="expense-summary-total">
        <h4>Total Credit</h4>
        <p className="expense-total-amount">{formatCurrency(totalCredit)}</p>
      </div>

      <div className="expense-summary-total">
        <h4>Net Balance</h4>
        <p className="expense-total-amount">{formatCurrency(netBalance)}</p>
      </div>

      <div className="expense-category-breakdown">
        <h4>Breakdown by Category</h4>
        <ul>
          {categoryBreakdown.map(({ category, type, total }) => (
            <li key={`${category}_${type}`}>
              <span className="expense-category-name">{category} ({type})</span>
              <span className="expense-category-amount">{formatCurrency(total)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseSummary;