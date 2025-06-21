import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseSummary from '../components/ExpenseSummary';

// Create a custom hook for localStorage access
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

const Expense = () => {
  const [expenses, setExpenses] = useLocalStorage('officeExpenses', []);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const clearAllExpenses = () => {
    if (window.confirm('Are you sure you want to delete all expenses?')) {
      setExpenses([]);
    }
  };

  return (
    <div className="expense-container">
      <header className="expense-header">
        <h1>Office Expense Management</h1>
        <p>Track and manage your office expenses efficiently</p>
      </header>

      <div className="expense-layout">
        <div className="expense-form-section">
          <ExpenseForm onSave={addExpense} />
          <ExpenseSummary expenses={expenses} />
        </div>

        <div className="expense-list-section">
          <div className="expense-list-header">
            <h2>Expense Records</h2>
            {expenses.length > 0 && (
              <button onClick={clearAllExpenses} className="clear-all-btn">
                Clear All
              </button>
            )}
          </div>
          <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        </div>
      </div>
    </div>
  );
};

export default Expense;