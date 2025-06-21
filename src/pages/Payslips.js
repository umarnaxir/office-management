import React, { useState } from 'react';
import PayslipForm from '../components/PayslipForm';
import PayslipList from '../components/PayslipList';

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);

  const addPayslip = (payslip) => {
    setPayslips([...payslips, { ...payslip, id: Date.now() }]);
  };

  const deletePayslip = (id) => {
    setPayslips(payslips.filter(p => p.id !== id));
  };

  return (
    <div className="page-payslips">
      <h1>Payslips</h1>

      <PayslipForm onSave={addPayslip} />

      <PayslipList payslips={payslips} onDelete={deletePayslip} />
    </div>
  );
};

export default Payslips;
