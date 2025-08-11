import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../global/Navbar';
import Footer from '@/global/Footer';

import '../styles/globals.css';
import '../styles/Dashboard.css'; 
import '../styles/Navbar.css';  
import '../styles/Expense.css'; 
import '../styles/payslips.css'; 
import '../styles/Reimbursement.css';
import '../styles/Bills.css';
import '../styles/Leave.css';
import '../styles/Employee.css';
import '../styles/Attendance.css';
import '../styles/Documents.css';
import '../styles/TestPage.module.css';
import '../styles/auth-styles.css';

import { ThemeProvider } from '../global/Theme';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  // List of routes where Navbar and Footer should be hidden
  const hideLayoutRoutes = ['/Login'];

  const shouldHideLayout = hideLayoutRoutes.includes(router.pathname);

  return (
    <ThemeProvider>
      <div className="app-wrapper">
        {!shouldHideLayout && <Navbar />}
        <main className="app-main">
          <Component {...pageProps} />
        </main>
        {/* {!shouldHideLayout && <Footer />} */}
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
