import React, { useState } from 'react';
import HomePage from '../components/Reimbursement/HomePage';
import ReimbursementForm from '../components/Reimbursement/ReimbursementForm';
import ReimbursementList from '../components/Reimbursement/ReimbursementList';

const ReimbursementSystem = () => {
  const [currentView, setCurrentView] = useState('home');
  const [reimbursements, setReimbursements] = useState([
    {
      id: 1,
      employeeName: 'Umar Nazir',
      description: 'Client lunch meeting',
      amount: 200,
      category: 'food',
      date: '2025-01-15',
      status: 'approved',
      receiptFile: { name: 'receipt_lunch.jpg' }
    },
    {
      id: 2,
      employeeName: 'Syed Owais',
      description: 'Conference travel expenses',
      amount: 200,
      category: 'travel',
      date: '2025-01-20',
      status: 'pending',
      receiptFile: { name: 'travel_receipt.pdf' }
    }
  ]);

  const addReimbursement = (reim) => {
    setReimbursements([...reimbursements, { 
      ...reim, 
      id: Date.now(), 
      status: 'pending' 
    }]);
    setCurrentView('home');
  };

  const updateStatus = (id, status) => {
    setReimbursements(reimbursements.map(r => 
      r.id === id ? { ...r, status } : r
    ));
  };

  const deleteReimbursement = (id) => {
    setReimbursements(reimbursements.filter(r => r.id !== id));
  };

  return (
    <div className="p-4 reimbursement-system">
      {currentView === 'home' && (
        <HomePage 
          reimbursements={reimbursements} 
          setCurrentView={setCurrentView} 
        />
      )}
      {currentView === 'form' && (
        <ReimbursementForm 
          addReimbursement={addReimbursement} 
          setCurrentView={setCurrentView} 
        />
      )}
      {currentView === 'list' && (
        <ReimbursementList 
          reimbursements={reimbursements}
          updateStatus={updateStatus}
          deleteReimbursement={deleteReimbursement}
          setCurrentView={setCurrentView} 
        />
      )}
    </div>
  );
};

export default ReimbursementSystem;
