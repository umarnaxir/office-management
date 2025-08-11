import React, { useState, useEffect } from 'react';
import HomePage from '../components/Bills/HomePage';
import CategoryPage from '../components/Bills/CategoryPage';
import { fetchBills, addBill, updateBill, deleteBill } from '../services/billServices';

const Bills = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBill, setEditingBill] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const loadBills = async () => {
      try {
        setLoading(true);
        const data = await fetchBills();
        setBills(data);
      } catch (err) {
        showNotification(err.message, 'error');
      } finally {
        setLoading(false);
      }
    };
    
    loadBills();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const addBillHandler = async (bill) => {
    try {
      const docId = await addBill({
        ...bill,
        status: 'unpaid',
        createdAt: new Date().toISOString()
      });
      setBills(prev => [...prev, { ...bill, id: docId, status: 'unpaid' }]);
      showNotification('Bill added successfully!', 'success');
      return true;
    } catch (err) {
      showNotification(`Failed to add bill: ${err.message}`, 'error');
      return false;
    }
  };

  const editBillHandler = async (updatedBill) => {
    try {
      await updateBill(updatedBill.id, updatedBill);
      setBills(prev => prev.map(b => b.id === updatedBill.id ? updatedBill : b));
      setEditingBill(null);
      showNotification('Bill updated successfully!', 'success');
      return true;
    } catch (err) {
      showNotification(`Failed to update bill: ${err.message}`, 'error');
      return false;
    }
  };

  const updateStatusHandler = async (id, currentStatus) => {
    const newStatus = currentStatus === 'paid' ? 'unpaid' : 'paid';
    try {
      await updateBill(id, { status: newStatus });
      setBills(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      showNotification(`Bill marked as ${newStatus}`, 'success');
    } catch (err) {
      showNotification(`Failed to update status: ${err.message}`, 'error');
    }
  };

  const deleteBillHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      try {
        await deleteBill(id);
        setBills(prev => prev.filter(b => b.id !== id));
        showNotification('Bill deleted successfully!', 'success');
      } catch (err) {
        showNotification(`Failed to delete bill: ${err.message}`, 'error');
      }
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

  if (loading) return <div className="loading">Loading bills...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="bills-container">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
          <button onClick={() => setNotification({ show: false, message: '', type: '' })}>×</button>
        </div>
      )}

      {currentPage === 'home' ? (
        <HomePage 
          onNavigate={setCurrentPage} 
          bills={bills} 
        />
      ) : (
        <CategoryPage 
          category={currentPage}
          bills={bills}
          onAddBill={addBillHandler}
          onEdit={editBillHandler}
          onStatusChange={updateStatusHandler}
          onDelete={deleteBillHandler}
          onDownloadReceipt={downloadReceipt}
          onBack={() => setCurrentPage('home')}
          editingBill={editingBill}
          setEditingBill={setEditingBill}
        />
      )}
    </div>
  );
};

export default Bills;