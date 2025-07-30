import React, { useState } from 'react';
import LeaveForm from '../components/LeaveTracter/LeaveForm';
import LeaveList from '../components/LeaveTracter/LeaveList';

const LeaveTracker = () => {
  const [leaves, setLeaves] = useState([]);

  const addLeave = (leave) => {
    setLeaves([...leaves, { ...leave, id: Date.now(), status: 'pending' }]);
  };

  const updateStatus = (id, status) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status } : l));
  };

  const deleteLeave = (id) => {
    setLeaves(leaves.filter(l => l.id !== id));
  };

  return (
    <div className="page-leave-tracker">
      <h1>Leave & Holiday Tracker</h1>

      <LeaveForm onSave={addLeave} />

      <LeaveList leaves={leaves} onStatusChange={updateStatus} onDelete={deleteLeave} />
    </div>
  );
};

export default LeaveTracker;
