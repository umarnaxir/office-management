import React, { useState } from 'react';
import ReimbursementForm from '../components/ReimbursementForm';
import ReimbursementList from '../components/ReimbursementList';

const Reimbursements = () => {
  const [reimbursements, setReimbursements] = useState([]);

  const addReimbursement = (reim) => {
    setReimbursements([...reimbursements, { ...reim, id: Date.now(), status: 'pending' }]);
  };

  const updateStatus = (id, status) => {
    setReimbursements(reimbursements.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteReimbursement = (id) => {
    setReimbursements(reimbursements.filter(r => r.id !== id));
  };

  return (
    <div className="page-reimbursements">
      <h1>Reimbursements</h1>

      <ReimbursementForm onSave={addReimbursement} />

      <ReimbursementList
        reimbursements={reimbursements}
        onStatusChange={updateStatus}
        onDelete={deleteReimbursement}
      />
    </div>
  );
};

export default Reimbursements;
