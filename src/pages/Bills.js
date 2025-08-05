import React, { useState } from 'react';
import HomePage from '../components/Bills/HomePage';
import CategoryPage from '../components/Bills/CategoryPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [bills, setBills] = useState([]);

  const addBill = (bill) => {
    setBills([...bills, { ...bill, id: Date.now(), status: 'unpaid' }]);
  };

  const updateStatus = (id, status) => {
    setBills(bills.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBill = (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      setBills(bills.filter(b => b.id !== id));
    }
  };

  const downloadReceipt = (bill) => {
    const receiptContent = `
BILL RECEIPT
=====================================
Bill ID: ${bill.id}
Category: ${bill.category.toUpperCase()}
Amount: ₹${bill.amount}
Due Date: ${new Date(bill.dueDate).toLocaleDateString()}
Status: ${bill.status.toUpperCase()}
${bill.provider ? `Provider: ${bill.provider}` : ''}
${bill.accountNumber ? `Account: ${bill.accountNumber}` : ''}
${bill.units ? `Units: ${bill.units}` : ''}
${bill.salaryMonth ? `Month: ${bill.salaryMonth}` : ''}
${bill.workDays ? `Work Days: ${bill.workDays}` : ''}
${bill.otherType ? `Type: ${bill.otherType}` : ''}
${bill.description ? `Notes: ${bill.description}` : ''}
=====================================
Generated on: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bill-receipt-${bill.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (currentPage === 'home') {
    return (
      <HomePage 
        onNavigate={setCurrentPage} 
        bills={bills}
      />
    );
  }

  return (
    <CategoryPage 
      category={currentPage}
      bills={bills}
      onAddBill={addBill}
      onStatusChange={updateStatus}
      onDelete={deleteBill}
      onDownloadReceipt={downloadReceipt}
      onBack={() => setCurrentPage('home')}
    />
  );
};

export default App;