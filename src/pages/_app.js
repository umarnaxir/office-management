  import React from 'react';
  import Navbar from '../components/Navbar';
  import '../styles/globals.css';
  import '../styles/Dashboard.css'; 
  // import '../styles/Navbar.css';  
  import '../styles/Expense.css'; 
  import '../styles/payslips.css'; 
  import '../styles/Reimbursement.css'
  import '../styles/Electricity.css'
  import '../styles/Leave.css'
  import '../styles/Employee.css';
  import '../styles/Attendance.css';
  
  const MyApp = ({ Component, pageProps }) => {
    return (
      <div className="app-wrapper">
        {/* <Navbar /> */}
        <main className="app-main">
          <Component {...pageProps} />
        </main>
      </div>
    );
  };

  export default MyApp;
