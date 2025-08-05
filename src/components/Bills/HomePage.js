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

  return (
    <div className="home-page">
      <div className="header">
        <h1>Bills Management System</h1>
        <p>Manage all your bills in one place</p>
      </div>

      <div className="stats-grid">
        {/* Total Bills Card */}
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <h3>{totalBills}</h3>
            <p>Total Bills</p>
          </div>
        </div>

        {/* Unpaid Bills Card */}
        <div className="stat-card unpaid">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>{unpaidBills}</h3>
            <p>Unpaid Bills</p>
          </div>
        </div>

        {/* Paid Bills Card */}
        <div className="stat-card paid">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{paidBills}</h3>
            <p>Paid Bills</p>
          </div>
        </div>

        {/* Total Amount Card - Now same size as others */}
        <div className="stat-card bill">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>₹{totalAmount.toLocaleString()}</h3>
            <p>Total Amount</p>
          </div>
        </div>
      </div>

    <div className="header">
        <h3>Add Bills</h3>
        {/* <p>Add all your bills here</p> */}
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

      <div className="recent-bills">
        <h2>Recent Bills</h2>
        {bills.slice(-3).reverse().map(bill => (
          <div key={bill.id} className="recent-bill-item">
            <div className="bill-info">
              <span className="bill-type">{bill.category.toUpperCase()}</span>
              <span className="bill-description">{bill.description || bill.provider || 'Bill'}</span>
            </div>
            <div className="bill-amount">₹{bill.amount}</div>
            <div className={`bill-status ${bill.status}`}>{bill.status}</div>
          </div>
        ))}
        {bills.length === 0 && (
          <p className="no-bills">No bills added yet. Start by adding your first bill!</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;