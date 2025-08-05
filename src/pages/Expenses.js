import React, { useState, useEffect } from 'react';
import ExpenseHome from '../components/Expenses/ExpenseHome';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import ExpenseList from '../components/Expenses/ExpenseList';
import ExpenseSummary from '../components/Expenses/ExpenseSummary';

const initialJsonData = [];

const useJsonFile = (initialData) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem('expensesJson') || '[]');
      setData(storedData.length > 0 ? storedData : initialData);
    } catch (error) {
      console.error('Error reading JSON data:', error);
      setData(initialData);
    }
  }, []);

  const saveData = (newData) => {
    try {
      setData(newData);
      localStorage.setItem('expensesJson', JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving JSON data:', error);
    }
  };

  return [data, saveData];
};

const Expense = () => {
  const [expenses, setExpenses] = useJsonFile(initialJsonData);
  const [currentView, setCurrentView] = useState('home');

  const addExpense = (expense) => {
    const newExpense = { ...expense, id: Date.now() };
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const clearAllExpenses = () => {
    if (window.confirm('Are you sure you want to delete all expenses?')) {
      setExpenses([]);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <ExpenseHome 
            expenses={expenses} 
            setCurrentView={setCurrentView}
            addExpense={addExpense}
          />
        );
      case 'form':
        return (
          <div className="expense-container">
            <header className="expense-header">
              <h1>Add New Expense</h1>
              <button 
                className="expense-back-btn"
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </button>
            </header>
            <div className="expense-layout">
              <div className="expense-form-section">
                <ExpenseForm 
                  onSave={(expense) => {
                    addExpense(expense);
                    setCurrentView('home');
                  }} 
                />
                <ExpenseSummary expenses={expenses} />
              </div>
            </div>
          </div>
        );
      case 'list':
        return (
          <div className="expense-container">
            <header className="expense-header">
              <h1>Expense Records</h1>
              <button 
                className="expense-back-btn"
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </button>
            </header>
            <div className="expense-layout">
              <div className="expense-list-section">
                <div className="expense-list-header">
                  <h2>All Expenses</h2>
                  {expenses.length > 0 && (
                    <button onClick={clearAllExpenses} className="expense-clear-all-btn">
                      Clear All
                    </button>
                  )}
                </div>
                <ExpenseList expenses={expenses} onDelete={deleteExpense} />
              </div>
            </div>
          </div>
        );
      case 'summary':
        return (
          <div className="expense-container">
            <header className="expense-header">
              <h1>Expense Analytics</h1>
              <button 
                className="expense-back-btn"
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </button>
            </header>
            <div className="expense-layout">
              <div className="expense-summary-section">
                <ExpenseSummary expenses={expenses} />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <ExpenseHome 
            expenses={expenses} 
            setCurrentView={setCurrentView}
            addExpense={addExpense}
          />
        );
    }
  };

  return renderCurrentView();
};

export default Expense;