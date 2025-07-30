import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import ExpenseList from '../components/Expenses/ExpenseList';
import ExpenseSummary from '../components/Expenses/ExpenseSummary';

// Mock JSON file content (in a real app, this would be read from a file via API)
const initialJsonData = [];

// Custom hook to simulate JSON file operations
const useJsonFile = (initialData) => {
  const [data, setData] = useState(initialData);

  // Simulate reading JSON file on mount
  useEffect(() => {
    // In a real app, fetch from backend API (e.g., /api/expenses)
    // For demo, use localStorage as a fallback or mock data
    try {
      const storedData = localStorage.getItem('expensesJson');
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        setData(initialData);
      }
    } catch (error) {
      console.error('Error reading JSON data:', error);
    }
  }, []);

  // Simulate writing to JSON file
  const saveData = (newData) => {
    try {
      setData(newData);
      // In a real app, send to backend API to write to expenses.json
      localStorage.setItem('expensesJson', JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving JSON data:', error);
    }
  };

  return [data, saveData];
};

const Expense = () => {
  const [expenses, setExpenses] = useJsonFile(initialJsonData);

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