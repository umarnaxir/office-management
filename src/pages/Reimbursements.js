import React, { useState, useEffect } from 'react';
import HomePage from '../components/Reimbursement/HomePage';
import ReimbursementForm from '../components/Reimbursement/ReimbursementForm';
import ReimbursementList from '../components/Reimbursement/ReimbursementList';
import { fetchReimbursements } from '../services/reimburseServices';

const ReimbursementSystem = () => {
  const [currentView, setCurrentView] = useState('home');
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReimbursements = async () => {
      try {
        const data = await fetchReimbursements();
        setReimbursements(data);
      } catch (error) {
        console.error("Failed to fetch reimbursements:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReimbursements();
  }, [currentView]); // Refetch when view changes

  if (loading && currentView === 'home') {
    return <div className="loading-message">Loading...</div>;
  }

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
          setCurrentView={setCurrentView} 
        />
      )}
      {currentView === 'list' && (
        <ReimbursementList 
          setCurrentView={setCurrentView} 
        />
      )}
    </div>
  );
};

export default ReimbursementSystem;