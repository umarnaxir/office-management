import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addEmployee = (emp) => {
    setEmployees([...employees, { ...emp, id: Date.now() }]);
    setShowForm(false);
  };

  const updateEmployee = (emp) => {
    setEmployees(employees.map(e => e.id === emp.id ? emp : e));
    setShowForm(false);
    setSelectedEmployee(null);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  return (
    <div className="page-employees">
      <h1>Employee Management</h1>

      <button onClick={() => setShowForm(true)}>Add Employee</button>

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
        onEdit={(emp) => {
          setSelectedEmployee(emp);
          setShowForm(true);
        }}
        onDelete={deleteEmployee}
      />
    </div>
  );
};

export default Employees;
