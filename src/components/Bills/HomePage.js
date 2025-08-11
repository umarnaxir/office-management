import React from 'react';
import { BarChart3, Clock, CheckCircle, DollarSign, Zap, Wifi, User, FileText } from 'lucide-react';

const HomePage = ({ onNavigate, bills }) => {
  const totalBills = bills.length;
  const unpaidBills = bills.filter(bill => bill.status === 'unpaid').length;
  const paidBills = bills.filter(bill => bill.status === 'paid').length;
  const totalAmount = bills.reduce((sum, bill) => sum + parseFloat(bill.amount || 0), 0);

  const categories = [
    { name: 'Electricity Bills', icon: Zap, key: 'electricity', color: '#FFB800' },
    { name: 'WiFi Bills', icon: Wifi, key: 'wifi', color: '#2196F3' },
    { name: 'Aunty Salary', icon: User, key: 'salary', color: '#4CAF50' },
    { name: 'Others', icon: FileText, key: 'others', color: '#9C27B0' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="home-page">
      <div className="header">
        <h1>Bills Management System</h1>
        <p>Manage all your bills in one place</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <h3>{totalBills}</h3>
            <p>Total Bills</p>
          </div>
        </div>

        <div className="stat-card unpaid">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>{unpaidBills}</h3>
            <p>Unpaid Bills</p>
          </div>
        </div>

        <div className="stat-card paid">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{paidBills}</h3>
            <p>Paid Bills</p>
          </div>
        </div>

        <div className="stat-card content">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>{formatCurrency(totalAmount)}</h3>
            <p>Total Amount</p>
          </div>
        </div>
      </div>

      <div className="categories-grid">
        {categories.map(category => {
          const IconComponent = category.icon;
          return (
            <div 
              key={category.key}
              className="category-card"
              onClick={() => onNavigate(category.key)}
              style={{ borderColor: category.color }}
            >
              <div className="category-icon" style={{ color: category.color }}>
                <IconComponent size={32} />
              </div>
              <h3>{category.name}</h3>
              <p>{bills.filter(bill => bill.category === category.key).length} bills</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;