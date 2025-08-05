import React, { useState, useEffect } from 'react';
import { Plus, FileText, TrendingUp, Activity, Coffee, Utensils, Zap, Wifi, Car, ShoppingCart, Wrench, MoreHorizontal, Calendar, IndianRupee, PieChart, BarChart3, Target, Clock, Filter, Download, Eye, Sparkles } from 'lucide-react';

const ExpenseHome = ({ expenses, setCurrentView, addExpense }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [showQuickStats, setShowQuickStats] = useState(false);

  useEffect(() => {
    setAnimationTrigger(true);
    const timer = setTimeout(() => setShowQuickStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'Food Items', name: 'Food Items', icon: Utensils, color: '#FF6B6B', bgColor: '#FFE5E5' },
    { id: 'Tea/Coffee', name: 'Tea/Coffee', icon: Coffee, color: '#8B4513', bgColor: '#F4E4D1' },
    { id: 'Daily Items', name: 'Daily Items', icon: ShoppingCart, color: '#4ECDC4', bgColor: '#E0F7F6' },
    { id: 'Electricity Bills', name: 'Electricity', icon: Zap, color: '#FFD93D', bgColor: '#FFF8D1' },
    { id: 'Internet Bills', name: 'Internet', icon: Wifi, color: '#6C5CE7', bgColor: '#E8E5FF' },
    { id: 'Office Supplies', name: 'Office Supplies', icon: FileText, color: '#A8E6CF', bgColor: '#E8F5E8' },
    { id: 'Maintenance', name: 'Maintenance', icon: Wrench, color: '#FF8C94', bgColor: '#FFE5E7' },
    { id: 'Transportation', name: 'Transportation', icon: Car, color: '#45B7D1', bgColor: '#E1F3FF' },
    { id: 'Other', name: 'Other', icon: MoreHorizontal, color: '#95A5A6', bgColor: '#F0F0F0' }
  ];

  const stats = {
    totalExpenses: expenses.length,
    totalDebit: expenses
      .filter(exp => exp.type === 'debit')
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0),
    totalCredit: expenses
      .filter(exp => exp.type === 'credit')
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0),
    netBalance: expenses
      .filter(exp => exp.type === 'credit')
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0) -
      expenses
      .filter(exp => exp.type === 'debit')
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0),
    thisMonth: expenses.filter(exp => {
      const expenseDate = new Date(exp.date);
      const now = new Date();
      return expenseDate.getMonth() === now.getMonth() && 
             expenseDate.getFullYear() === now.getFullYear();
    }).length,
    topCategory: getTopCategory(expenses)
  };

  const categoryTotals = categories.map(category => {
    const categoryExpenses = expenses.filter(exp => exp.category === category.id);
    const total = categoryExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    const count = categoryExpenses.length;
    return { ...category, total, count };
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuickExpense = (category) => {
    setSelectedCategory(category);
    setCurrentView('form');
  };

  const recentExpenses = expenses
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  function getTopCategory(expenses) {
    if (expenses.length === 0) return 'No data';
    const categoryTotals = {};
    expenses.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + parseFloat(exp.amount);
    });
    return Object.keys(categoryTotals).reduce((a, b) => 
      categoryTotals[a] > categoryTotals[b] ? a : b
    ) || 'No data';
  }

  return (
    <div className={`expense-home ${animationTrigger ? 'expense-animate-in' : ''}`}>
      <div className="expense-home-header">
        <div className="expense-header-content">
          <div className="expense-header-text">
            <h1>
              <Sparkles className="expense-header-icon" />
              Expense Dashboard
            </h1>
            <p>Track, manage, and analyze your expenses efficiently</p>
          </div>
          <div className="expense-header-actions">
            <button 
              className="expense-quick-action-btn expense-primary-btn"
              onClick={() => setCurrentView('form')}
            >
              <Plus size={20} />
              Add Expense
            </button>
            <button 
              className="expense-quick-action-btn expense-secondary-btn"
              onClick={() => setCurrentView('list')}
            >
              <Eye size={20} />
              View All
            </button>
          </div>
        </div>
      </div>

      <div className={`expense-stats-overview ${showQuickStats ? 'expense-show' : ''}`}>
        <div className="expense-stat-card expense-stat-primary">
          <div className="expense-stat-icon">
            <IndianRupee />
          </div>
          <div className="expense-stat-content">
            <h3>{formatCurrency(stats.totalDebit)}</h3>
            <p>Total Expenses</p>
            <span className="expense-stat-trend">This month: {stats.thisMonth}</span>
          </div>
        </div>

        <div className="expense-stat-card expense-stat-success">
          <div className="expense-stat-icon">
            <TrendingUp />
          </div>
          <div className="expense-stat-content">
            <h3>{formatCurrency(stats.totalCredit)}</h3>
            <p>Total Income</p>
            <span className="expense-stat-trend">Credit entries</span>
          </div>
        </div>

        <div className="expense-stat-card expense-stat-info">
          <div className="expense-stat-icon">
            <Target />
          </div>
          <div className="expense-stat-content">
            <h3>{formatCurrency(Math.abs(stats.netBalance))}</h3>
            <p>Net Balance</p>
            <span className={`expense-stat-trend ${stats.netBalance >= 0 ? 'expense-positive' : 'expense-negative'}`}>
              {stats.netBalance >= 0 ? 'Surplus' : 'Deficit'}
            </span>
          </div>
        </div>

        <div className="expense-stat-card expense-stat-warning">
          <div className="expense-stat-icon">
            <Activity />
          </div>
          <div className="expense-stat-content">
            <h3>{stats.totalExpenses}</h3>
            <p>Total Entries</p>
            <span className="expense-stat-trend">Top: {stats.topCategory}</span>
          </div>
        </div>
      </div>

      <div className="expense-category-section">
        <div className="expense-section-header">
          <h2>
            <PieChart className="expense-section-icon" />
            Quick Add by Category
          </h2>
          <button className="expense-section-action">
            <Filter size={16} />
            Filter
          </button>
        </div>

        <div className="expense-category-grid">
          {categoryTotals.map((category, index) => (
            <div 
              key={category.id}
              className="expense-category-card"
              style={{ 
                '--expense-category-color': category.color,
                '--expense-category-bg': category.bgColor,
                animationDelay: `${index * 100}ms`
              }}
              onClick={() => handleQuickExpense(category)}
            >
              <div className="expense-category-icon">
                <category.icon size={24} />
              </div>
              <div className="expense-category-content">
                <h3>{category.name}</h3>
                <div className="expense-category-stats">
                  <span className="expense-category-amount">{formatCurrency(category.total)}</span>
                  <span className="expense-category-count">{category.count} entries</span>
                </div>
              </div>
              <div className="expense-category-add">
                <Plus size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="expense-recent-section">
        <div className="expense-section-header">
          <h2>
            <Clock className="expense-section-icon" />
            Recent Activity
          </h2>
          <button 
            className="expense-section-action"
            onClick={() => setCurrentView('list')}
          >
            View All
          </button>
        </div>

        <div className="expense-recent-list">
          {recentExpenses.length > 0 ? (
            recentExpenses.map((expense, index) => {
              const category = categories.find(cat => cat.id === expense.category);
              const Icon = category?.icon || MoreHorizontal;
              
              return (
                <div 
                  key={expense.id} 
                  className="expense-recent-item"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div 
                    className="expense-recent-icon"
                    style={{ 
                      backgroundColor: category?.bgColor || '#f0f0f0',
                      color: category?.color || '#666'
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="expense-recent-content">
                    <h4>{expense.description}</h4>
                    <p>
                      {expense.category} • {new Date(expense.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div className={`expense-recent-amount expense-${expense.type}`}>
                    {expense.type === 'debit' ? '-' : '+'}{formatCurrency(expense.amount)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="expense-empty-state">
              <Calendar className="expense-empty-icon" />
              <h3>No expenses yet</h3>
              <p>Start by adding your first expense using the categories above!</p>
              <button 
                className="expense-empty-action"
                onClick={() => setCurrentView('form')}
              >
                Add First Expense
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="expense-quick-actions-bar">
        <button 
          className="expense-action-item"
          onClick={() => setCurrentView('form')}
        >
          <Plus size={20} />
          <span>Add</span>
        </button>
        <button 
          className="expense-action-item"
          onClick={() => setCurrentView('list')}
        >
          <FileText size={20} />
          <span>View</span>
        </button>
        <button 
          className="expense-action-item"
          onClick={() => setCurrentView('summary')}
        >
          <BarChart3 size={20} />
          <span>Analytics</span>
        </button>
        <button className="expense-action-item">
          <Download size={20} />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

export default ExpenseHome;