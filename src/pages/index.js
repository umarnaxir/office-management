import React from "react";
import Link from "next/link";
import {
  Users, FileText, Calendar, DollarSign, CreditCard, FolderOpen,
  PieChart, Zap, Plane, Lightbulb, Heart
} from "lucide-react";
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  return (
    <>
      {/* Floating Particles */}
      <div className={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className={styles.dashboardContainer}>
        <div className={styles.pageDashboard}>
          <header className={styles.dashboardHeader}>
            <h1 className={styles.dashboardTitle}>SW Office Management</h1>
            <p className={styles.dashboardSubtitle}>
              Manage employees, tasks, finances, and data — all in one place to streamline your office workflow.
            </p>
          </header>
          <div className={styles.dashboardGrid}>
            <Link href="/EmployeeManagement" className={styles.dashboardLink}>
              <div className={`${styles.dashboardCard} ${styles.employeesCard}`}>
                <Users size={48} className={`${styles.cardIcon} ${styles.iconBlue}`} />
                <div className={styles.cardContent}>
                  <h3>Employee Management</h3>
                  <p>Manage employee records, profiles, and information efficiently</p>
                </div>
              </div>
            </Link>
            <Link href="/OfficeLetters" className={styles.dashboardLink}>
              <div className={`${styles.dashboardCard} ${styles.offerLetterCard}`}>
                <FileText size={48} className={`${styles.cardIcon} ${styles.iconGreen}`} />
                <div className={styles.cardContent}>
                  <h3>Office Letter</h3>
                  <p>Generate and manage professional offer letters</p>
                </div>
              </div>
            </Link>
            <Link href="/Attendance" className={styles.dashboardLink}>
              <div className={`${styles.dashboardCard} ${styles.attendanceCard}`}>
                <Calendar size={48} className={`${styles.cardIcon} ${styles.iconPurple}`} />
                <div className={styles.cardContent}>
                  <h3>Attendance</h3>
                  <p>Track and monitor daily employee attendance records</p>
                </div>
              </div>
            </Link>
            <Link href="/Reimbursements" className={styles.dashboardLink}>
              <div className={`${styles.dashboardCard} ${styles.reimbursementsCard}`}>
                <DollarSign size={48} className={`${styles.cardIcon} ${styles.iconYellow}`} />
                <div className={styles.cardContent}>
                  <h3>Reimburse</h3>
                  <p>Process and manage employee reimbursement requests</p>
                </div>
              </div>
            </Link>
            <Link href="/Payslips" className={styles.dashboardLink}>
              <div className={`${styles.dashboardCard} ${styles.payslipsCard}`}>
                <CreditCard size={48} className={`${styles.cardIcon} ${styles.iconPink}`} />
                <div className={styles.cardContent}>
                  <h3>Payslips</h3>
                  <p>Generate and distribute monthly payslips securely</p>
                </div>
              </div>
            </Link>
            <Link href="/DocumentManagement" className={styles.dashboardLink}>
              <div className={`${styles.dashboardCard} ${styles.documentManagementCard}`}>
                <FolderOpen size={48} className={`${styles.cardIcon} ${styles.iconIndigo}`} />
                <div className={styles.cardContent}>
                  <h3>Document Management</h3>
                  <p>Organize and store important business documents</p>
                </div>
              </div>
            </Link>
            <Link href="/Expenses" className={styles.dashboardLink}>
              <div className={`${styles.dashboardCard} ${styles.expenseCategoriesCard}`}>
                <PieChart size={48} className={`${styles.cardIcon} ${styles.iconRed}`} />
                <div className={styles.cardContent}>
                  <h3>Expense</h3>
                  <p>Categorize and manage different expense types</p>
                </div>
              </div>
            </Link>
            <Link href="/Bills" className={styles.dashboardLink}>
              <div className={`${styles.dashboardCard} ${styles.electricityBillsCard}`}>
                <Zap size={48} className={`${styles.cardIcon} ${styles.iconOrange}`} />
                <div className={styles.cardContent}>
                  <h3>Bills</h3>
                  <p>Manage utility bills and payment tracking</p>
                </div>
              </div>
            </Link>
            <Link href="/LeaveTracker" className={styles.dashboardLink}>
              <div className={`${styles.dashboardCard} ${styles.leaveTrackerCard}`}>
                <Plane size={48} className={`${styles.cardIcon} ${styles.iconTeal}`} />
                <div className={styles.cardContent}>
                  <h3>Leave Tracker</h3>
                  <p>Monitor and approve employee leave requests</p>
                </div>
              </div>
            </Link>
          </div>
          {/* Expense Reminder */}
          <div className={styles.expenseReminderContainer}>
            <Link href="/Expenses" className={styles.dashboardLink}>
              <div className={styles.expenseReminder}>
                <Lightbulb size={48} className={styles.reminderIcon} />
                <div className={styles.reminderContent}>
                  <div className={styles.reminderTitle}>
                    Don't forget to enter this week's expenses!
                  </div>
                  <div className={styles.reminderSubtitle}>
                    Stay on top of your financial tracking
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;