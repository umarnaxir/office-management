import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  Calendar,
  DollarSign,
  CreditCard,
  FolderOpen,
  PieChart,
  Zap,
  Plane,
  Lightbulb,
  Sun,
  Moon,
  Heart
} from "lucide-react";

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="dashboard-container">
        <div className="page-dashboard">
          <header className="dashboard-header">
            <h1 className="dashboard-title">Office Management System</h1>
            <p className="dashboard-subtitle">
              Manage employees, tasks, finances, and data — all in one place to streamline your
              office workflow.
            </p>
          </header>

          {/* Dashboard Cards */}
          <div className="dashboard-grid">
            <Link href="/EmployeeManagement" className="dashboard-link">
              <div className="dashboard-card employees-card">
                <Users size={48} className="card-icon icon-blue" />
                <div className="card-content">
                  <h3>Employee Management</h3>
                  <p>Manage employee records, profiles, and information efficiently</p>
                </div>
              </div>
            </Link>

            <Link href="/OfferLetter" className="dashboard-link">
              <div className="dashboard-card offer-letter-card">
                <FileText size={48} className="card-icon icon-green" />
                <div className="card-content">
                  <h3>Offer Letter</h3>
                  <p>Generate and manage professional offer letters</p>
                </div>
              </div>
            </Link>

            <Link href="/Attendance" className="dashboard-link">
              <div className="dashboard-card attendance-card">
                <Calendar size={48} className="card-icon icon-purple" />
                <div className="card-content">
                  <h3>Attendance</h3>
                  <p>Track and monitor daily employee attendance records</p>
                </div>
              </div>
            </Link>

            <Link href="/Reimbursements" className="dashboard-link">
              <div className="dashboard-card reimbursements-card">
                <DollarSign size={48} className="card-icon icon-yellow" />
                <div className="card-content">
                  <h3>Reimburse</h3>
                  <p>Process and manage employee reimbursement requests</p>
                </div>
              </div>
            </Link>

            <Link href="/Payslips" className="dashboard-link">
              <div className="dashboard-card payslips-card">
                <CreditCard size={48} className="card-icon icon-pink" />
                <div className="card-content">
                  <h3>Payslips</h3>
                  <p>Generate and distribute monthly payslips securely</p>
                </div>
              </div>
            </Link>

            <Link href="/DocumentManagement" className="dashboard-link">
              <div className="dashboard-card document-management-card">
                <FolderOpen size={48} className="card-icon icon-indigo" />
                <div className="card-content">
                  <h3>Document Management</h3>
                  <p>Organize and store important business documents</p>
                </div>
              </div>
            </Link>

            <Link href="/Expenses" className="dashboard-link">
              <div className="dashboard-card expense-categories-card">
                <PieChart size={48} className="card-icon icon-red" />
                <div className="card-content">
                  <h3>Expense Categories</h3>
                  <p>Categorize and manage different expense types</p>
                </div>
              </div>
            </Link>

            <Link href="/ElectricityBills" className="dashboard-link">
              <div className="dashboard-card electricity-bills-card">
                <Zap size={48} className="card-icon icon-orange" />
                <div className="card-content">
                  <h3>Electricity Bills</h3>
                  <p>Manage utility bills and payment tracking</p>
                </div>
              </div>
            </Link>

            <Link href="/LeaveTracker" className="dashboard-link">
              <div className="dashboard-card leave-tracker-card">
                <Plane size={48} className="card-icon icon-teal" />
                <div className="card-content">
                  <h3>Leave Tracker</h3>
                  <p>Monitor and approve employee leave requests</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Expense Reminder */}
          <div className="expense-reminder-container">
            <Link href="/ExpenseCategories" className="dashboard-link">
              <div className="expense-reminder">
                <Lightbulb size={48} className="reminder-icon" />
                <div className="reminder-content">
                  <div className="reminder-title">
                    Don't forget to enter this week's expenses!
                  </div>
                  <div className="reminder-subtitle">
                    Stay on top of your financial tracking
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="dashboard-footer">
          <div className="footer-content">
            <p>© Office Management System 2025. All Rights Reserved.</p>
            <p>
              Crafted with <Heart size={16} className="heart-icon" /> in Kashmir by{" "}
              <span className="developer-name">Saibbyweb</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
