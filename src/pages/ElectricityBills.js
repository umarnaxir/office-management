import React, { useState } from 'react';
import ElectricityBillForm from '../components/Electricity/ElectricityBillForm';
import ElectricityBillList from '../components/Electricity/ElectricityBillList';

const ElectricityBills = () => {
  const [bills, setBills] = useState([]);

  const addBill = (bill) => {
    setBills([...bills, { ...bill, id: Date.now(), status: 'unpaid' }]);
  };

  const updateStatus = (id, status) => {
    setBills(bills.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBill = (id) => {
    setBills(bills.filter(b => b.id !== id));
  };

  return (
    <div className="page-electricity-bills">
      <h1>Electricity Bills</h1>

      <ElectricityBillForm onSave={addBill} />

      <ElectricityBillList
        bills={bills}
        onStatusChange={updateStatus}
        onDelete={deleteBill}
      />
    </div>
  );
};

export default ElectricityBills;
