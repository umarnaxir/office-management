import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import '../styles/globals.css';
import '../styles/Dashboard.css'; 
import '../styles/Navbar.css';  
import '../styles/Expense.css'; 
import '../styles/payslips.css'; 
import '../styles/Reimbursement.css'
import '../styles/Bills.css'
import '../styles/Leave.css'
import '../styles/Employee.css';
import '../styles/Attendance.css';
import '../styles/Documents.css';

import { ThemeProvider } from '../components/Theme'; // Add this line!

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <div className="app-wrapper">
        <Navbar />
        <main className="app-main">
          <Component {...pageProps} />
        </main>
        <Footer/>
      </div>
    </ThemeProvider>
    
  );
};

export default MyApp;
