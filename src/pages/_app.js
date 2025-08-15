// pages/_app.js
import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../global/Navbar';
// import Footer from '@/global/Footer';

// Global styles
import '../styles/globals.css';

// Component-specific styles (consider converting these to CSS Modules)
import '../styles/Navbar.css';
import '../styles/Expense.css';
import '../styles/payslips.css';
import '../styles/Reimbursement.css';
import '../styles/Bills.css';
import '../styles/Leave.css';
import '../styles/Employee.css';
import '../styles/Attendance.css';
import '../styles/Documents.css';
import '../styles/auth-styles.css';
import '../styles/OfficeLetters.css';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  // Routes where Navbar & Footer should be hidden
  const hideLayoutRoutes = ['/Login'];
  const shouldHideLayout = hideLayoutRoutes.includes(router.pathname);

  return (
    <div className="app-wrapper">
      {!shouldHideLayout && <Navbar />}
      <main className="app-main">
        <Component {...pageProps} />
      </main>
      {/* {!shouldHideLayout && <Footer />} */}
    </div>
  );
};

export default MyApp;