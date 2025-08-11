import React, { useState, useEffect } from 'react';
import LeaveTrackerHome from '../components/LeaveTracter/Home';
import LeaveForm from '../components/LeaveTracter/LeaveForm';
import LeaveList from '../components/LeaveTracter/LeaveList';
import { fetchLeaves, addLeave, updateLeaveStatus, deleteLeave, } from '../services/leaveServices';
import { Calendar } from 'lucide-react';

const LeaveTracker = () => {
  const [leaves, setLeaves] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const leaveTypes = ['Medical Leave', 'Casual Leave', 'Emergency Leave', 'Paid Leave', 'Other'];

  useEffect(() => {
    const loadLeaves = async () => {
      try {
        setLoading(true);
        const data = await fetchLeaves();
        setLeaves(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadLeaves();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const addLeaveHandler = async (leave) => {
    try {
      const docId = await addLeave({
        ...leave,
        status: 'pending'
      });
      setLeaves(prev => [...prev, { ...leave, id: docId, status: 'pending' }]);
      showNotification('Leave request submitted successfully!', 'success');
      setCurrentView('home');
      return true;
    } catch (err) {
      showNotification(`Failed to submit leave: ${err.message}`, 'error');
      return false;
    }
  };

  const updateStatusHandler = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      setLeaves(prev => prev.map(l => l.id === id ? { ...l, status } : l));
      showNotification(`Leave request ${status}`, 'success');
    } catch (err) {
      showNotification(`Failed to update status: ${err.message}`, 'error');
    }
  };

  const deleteLeaveHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      try {
        await deleteLeave(id);
        setLeaves(prev => prev.filter(l => l.id !== id));
        showNotification('Leave request deleted', 'success');
      } catch (err) {
        showNotification(`Failed to delete leave: ${err.message}`, 'error');
      }
    }
  };

  if (loading) return <div className="loading">Loading leave requests...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="lt-container">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
          <button onClick={() => setNotification({ show: false, message: '', type: '' })}>×</button>
        </div>
      )}

      <div className="lt-header">
        <div className="lt-header-content">
          <h1 className="lt-main-title">
            <Calendar className="lt-title-icon" />
            Leave & Holiday Tracker
          </h1>
          <p className="lt-subtitle">Manage your time off and vacation requests</p>
        </div>
      </div>
      
      {currentView === 'home' && (
        <LeaveTrackerHome 
          leaves={leaves}
          setCurrentView={setCurrentView}
        />
      )}
      
      {currentView === 'form' && (
        <LeaveForm 
          onSave={addLeaveHandler} 
          leaveTypes={leaveTypes} 
          onCancel={() => setCurrentView('home')} 
        />
      )}
      
      {currentView === 'list' && (
        <LeaveList 
          leaves={leaves} 
          onStatusChange={updateStatusHandler} 
          onDelete={deleteLeaveHandler} 
          onBack={() => setCurrentView('home')}
        />
      )}
    </div>
  );
};

export default LeaveTracker;