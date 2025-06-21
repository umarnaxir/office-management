'use client';

import React, { useState } from 'react';
import EmployeeList from '../Project/EmployeeList';
import EmployeeForm from '../Project/EmployeeForm';
import EmployeeDetails from '../Project/EmployeeDetails';
import SalaryReceipt from '../Project/SalaryReceipt';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now() }]);
    setShowForm(false);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
    setSelectedEmployee(null);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="employee-management">
      <h1>Employee Management</h1>
      
      <button onClick={() => setShowForm(true)}>Add New Employee</button>
      
      {showForm && (
        <EmployeeForm 
          onSave={selectedEmployee ? updateEmployee : addEmployee} 
          onCancel={() => {
            setShowForm(false);
            setSelectedEmployee(null);
          }} 
          employee={selectedEmployee}
        />
      )}
      
      <EmployeeList 
        employees={employees} 
        onSelect={setSelectedEmployee}
        onEdit={(emp) => {
          setSelectedEmployee(emp);
          setShowForm(true);
        }}
        onDelete={deleteEmployee}
        onGenerateReceipt={(emp) => {
          setSelectedEmployee(emp);
          setShowReceipt(true);
        }}
      />
      
      {selectedEmployee && !showForm && !showReceipt && (
        <EmployeeDetails 
          employee={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)}
        />
      )}
      
      {showReceipt && selectedEmployee && (
        <SalaryReceipt 
          employee={selectedEmployee} 
          onClose={() => setShowReceipt(false)}
          onPrint={() => window.print()}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;
