import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeManagement/EmployeeList';
import EmployeeForm from '../components/EmployeeManagement/EmployeeForm';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const departments = [
    'Front End Developer',
    'Back End Developer',
    'Fullstack Developer',
    'SEO',
    'HR',
    'Other'
  ];

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

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (departmentFilter ? emp.department === departmentFilter : true)
  );

  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="empmgmt-container">
      <h1 className="empmgmt-page-title">Employee Management</h1>

      {/* Dashboard Stats */}
      <div className="empmgmt-dashboard-grid">
        <div className="empmgmt-stat-card empmgmt-stat-blue">
          <h3 className="empmgmt-stat-title">Total Employees</h3>
          <p className="empmgmt-stat-value">{employees.length}</p>
        </div>
        <div className="empmgmt-stat-card empmgmt-stat-green">
          <h3 className="empmgmt-stat-title">Departments</h3>
          <p className="empmgmt-stat-value">{Object.keys(departmentCounts).length}</p>
        </div>
        <div className="empmgmt-stat-card empmgmt-stat-yellow">
          <h3 className="empmgmt-stat-title">Average Salary</h3>
          <p className="empmgmt-stat-value">
            ${employees.length ? (employees.reduce((sum, emp) => sum + Number(emp.salary), 0) / employees.length).toFixed(2) : 0}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="empmgmt-search-filter">
        <input
          type="text"
          placeholder="Search employees..."
          className="empmgmt-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="empmgmt-filter-select"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <button
          className="empmgmt-add-button"
          onClick={() => setShowForm(true)}
        >
          Add Employee
        </button>
      </div>

      {/* Employee Form */}
      {showForm && (
        <EmployeeForm
          onSave={selectedEmployee ? updateEmployee : addEmployee}
          onCancel={() => {
            setShowForm(false);
            setSelectedEmployee(null);
          }}
          employee={selectedEmployee}
          departments={departments} // Pass to form to populate department dropdown
        />
      )}

      {/* Employee List */}
      <EmployeeList
        employees={filteredEmployees}
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
