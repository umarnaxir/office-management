import React from "react";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="page-dashboard">
        <header className="dashboard-header">
          <h1 className="dashboard-title">
            Saibbyweb Office Management System
          </h1>
          <p className="dashboard-subtitle">
            Manage employees, tasks, finances, and data — all in one place to
            streamline your office workflow.
          </p>
        </header>

        <div className="dashboard-grid">
          <Link href="/EmployeeManagement" className="dashboard-link">
            <div className="dashboard-card employees-card">
              <div className="card-emoji">👥</div>
              <div className="card-content">
                <h3>Employee Management</h3>
                <p>
                  Manage employee records, profiles, and information efficiently
                </p>
              </div>
            </div>
          </Link>

          <Link href="/OfferLetter" className="dashboard-link">
            <div className="dashboard-card offer-letter-card">
              <div className="card-emoji">📄</div>
              <div className="card-content">
                <h3>Offer Letter</h3>
                <p>Generate and manage professional offer letters</p>
              </div>
            </div>
          </Link>

          <Link href="/Attendance" className="dashboard-link">
            <div className="dashboard-card attendance-card">
              <div className="card-emoji">📅</div>
              <div className="card-content">
                <h3>Attendance</h3>
                <p>Track and monitor daily employee attendance records</p>
              </div>
            </div>
          </Link>

          <Link href="/Reimbursements" className="dashboard-link">
            <div className="dashboard-card reimbursements-card">
              <div className="card-emoji">💸</div>
              <div className="card-content">
                <h3>Reimbursements</h3>
                <p>Process and manage employee reimbursement requests</p>
              </div>
            </div>
          </Link>

          <Link href="/Payslips" className="dashboard-link">
            <div className="dashboard-card payslips-card">
              <div className="card-emoji">💳</div>
              <div className="card-content">
                <h3>Payslips</h3>
                <p>Generate and distribute monthly payslips securely</p>
              </div>
            </div>
          </Link>

          <Link href="/DocumentManagement" className="dashboard-link">
            <div className="dashboard-card document-management-card">
              <div className="card-emoji">📁</div>
              <div className="card-content">
                <h3>Document Management</h3>
                <p>Organize and store important business documents</p>
              </div>
            </div>
          </Link>

          <Link href="/ExpenseCategories" className="dashboard-link">
            <div className="dashboard-card expense-categories-card">
              <div className="card-emoji">💰</div>
              <div className="card-content">
                <h3>Expense Categories</h3>
                <p>Categorize and manage different expense types</p>
              </div>
            </div>
          </Link>

          <Link href="/ElectricityBills" className="dashboard-link">
            <div className="dashboard-card electricity-bills-card">
              <div className="card-emoji">⚡</div>
              <div className="card-content">
                <h3>Electricity Bills</h3>
                <p>Manage utility bills and payment tracking</p>
              </div>
            </div>
          </Link>

          <Link href="/LeaveTracker" className="dashboard-link">
            <div className="dashboard-card leave-tracker-card">
              <div className="card-emoji">🏖️</div>
              <div className="card-content">
                <h3>Leave Tracker</h3>
                <p>Monitor and approve employee leave requests</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="expense-reminder-container">
          <div className="expense-reminder">
            <div className="reminder-emoji">💡</div>
            <div className="reminder-content">
              <div className="reminder-title">
                Don't forget to enter this week's expenses!
              </div>
              <div className="reminder-subtitle">
                Stay on top of your financial tracking
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>&copy; 2025 Saibbyweb Office Management System</p>
          <p>
            Developed by <span className="developer-name">Umar Nazir</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
