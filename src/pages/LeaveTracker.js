import React, { useState } from 'react';
import {
  Plus,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Activity,
  AlertCircle
} from 'lucide-react';
import LeaveTrackerHome from '../components/LeaveTracter/Home';
import LeaveForm from '../components/LeaveTracter/LeaveForm';
import LeaveList from '../components/LeaveTracter/LeaveList';

const LeaveTracker = () => {
  const [leaves, setLeaves] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  
  const leaveTypes = ['Select Leave', 'Medical Leave', 'Casual Leave', 'Emergency Leave', 'Paid Leave', 'Other'];

  const addLeave = (leave) => {
    setLeaves([...leaves, { 
      ...leave, 
      id: Date.now(), 
      status: 'pending',
      employeeName: 'You'
    }]);
    setCurrentView('home');
  };

  const updateStatus = (id, status) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status } : l));
  };

  const deleteLeave = (id) => {
    setLeaves(leaves.filter(l => l.id !== id));
  };

  return (
    <div className="lt-container">
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
          onSave={addLeave} 
          leaveTypes={leaveTypes} 
          onCancel={() => setCurrentView('home')} 
        />
      )}
      
      {currentView === 'list' && (
        <LeaveList 
          leaves={leaves} 
          onStatusChange={updateStatus} 
          onDelete={deleteLeave} 
          onBack={() => setCurrentView('home')}
        />
      )}
    </div>
  );
};

export default LeaveTracker;