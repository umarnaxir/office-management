'use client';

import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Office Management System Dashboard</h1>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>25</p>
        </div>
        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h3>Monthly Expenses</h3>
          <p>$15,000</p>
        </div>
        <div className="stat-card">
          <h3>Active Projects</h3>
          <p>5</p>
        </div>
      </div>
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          <li>Employee John Doe updated their leave request</li>
          <li>New purchase recorded: Office supplies</li>
          <li>Task "Monthly Report" marked as completed</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
