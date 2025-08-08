import React, { useState, useEffect } from 'react';
import ExpenseHome from '../components/Expenses/ExpenseHome';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import ExpenseList from '../components/Expenses/ExpenseList';
import ExpenseSummary from '../components/Expenses/ExpenseSummary';
import { fetchExpenses, addExpense, deleteExpense, deleteAllExpenses } from '../services/expenseService';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        setLoading(true);
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (err) {
        setError(err.message);
        alert('Failed to load expenses: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadExpenses();
  }, []);

  const addExpenseHandler = async (expense) => {
    try {
      const docId = await addExpense(expense);
      setExpenses(prev => [...prev, { ...expense, id: docId }]);
      alert('Expense added successfully!');
      return true;
    } catch (err) {
      alert('Failed to add expense: ' + err.message);
      return false;
    }
  };

  const deleteExpenseHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id);
        setExpenses(prev => prev.filter(exp => exp.id !== id));
        alert('Expense deleted successfully!');
      } catch (err) {
        alert('Failed to delete expense: ' + err.message);
      }
    }
  };

  const clearAllExpenses = async () => {
    if (window.confirm('Are you sure you want to delete ALL expenses? This cannot be undone.')) {
      try {
        await deleteAllExpenses();
        setExpenses([]);
        alert('All expenses deleted successfully!');
      } catch (err) {
        alert('Failed to delete all expenses: ' + err.message);
      }
    }
  };

  const renderCurrentView = () => {
    if (loading) return <div className="expense-loading">Loading expenses...</div>;
    if (error) return <div className="expense-error">Error: {error}</div>;

    switch (currentView) {
      case 'home':
        return (
          <ExpenseHome 
            expenses={expenses} 
            setCurrentView={setCurrentView}
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
                  onSave={async (expense) => {
                    const success = await addExpenseHandler(expense);
                    if (success) setCurrentView('home');
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
                <ExpenseList expenses={expenses} onDelete={deleteExpenseHandler} />
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
        return <ExpenseHome expenses={expenses} setCurrentView={setCurrentView} />;
    }
  };

  return renderCurrentView();
};

export default Expense;