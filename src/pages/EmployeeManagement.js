import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeManagement/EmployeeList';
import EmployeeForm from '../components/EmployeeManagement/EmployeeForm';
import { useFetchEmployees } from '../hooks/EmployeeManagement/useFetchEmployees';
import { useCreateEmployee } from '../hooks/EmployeeManagement/useCreateEmployee';
import { useUpdateEmployee } from '../hooks/EmployeeManagement/useUpdateEmployee';
import { useDeleteEmployee } from '../hooks/EmployeeManagement/useDeleteEmployee';
import { usePromoteIntern } from '../hooks/EmployeeManagement/usePromoteIntern';

const Employees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [employeeTypeFilter, setEmployeeTypeFilter] = useState('');

  const departments = [
    'Front End Developer',
    'Back End Developer',
    'Fullstack Developer',
    'SEO',
    'HR',
    'Other'
  ];

  const employeeTypes = [
    { value: '', label: 'All Types' },
    { value: 'full_time', label: 'Full-time' },
    { value: 'intern', label: 'Intern' }
  ];

  // Use hooks
  const { 
    loading, 
    error, 
    employees, 
    stats, 
    refresh 
  } = useFetchEmployees(employeeTypeFilter || null);

  const { 
    loading: creating, 
    error: createError, 
    createEmployee 
  } = useCreateEmployee();

  const { 
    loading: updating, 
    error: updateError, 
    updateEmployeeRecord 
  } = useUpdateEmployee();

  const { 
    loading: deleting, 
    error: deleteError, 
    deleteEmployeeRecord 
  } = useDeleteEmployee();

  const { 
    loading: promoting, 
    error: promoteError, 
    promoteInternRecord 
  } = usePromoteIntern();

  const handleAddEmployee = async (emp) => {
    try {
      await createEmployee(emp);
      refresh();
      setShowForm(false);
    } catch (e) {
      console.error("Failed to add employee:", e);
    }
  };

  const handleUpdateEmployee = async (emp) => {
    try {
      await updateEmployeeRecord(emp.id, emp);
      refresh();
      setShowForm(false);
      setSelectedEmployee(null);
    } catch (e) {
      console.error("Failed to update employee:", e);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployeeRecord(id);
      refresh();
    } catch (e) {
      console.error("Failed to delete employee:", e);
    }
  };

  const handlePromoteIntern = async (id, promotionData) => {
    try {
      await promoteInternRecord(id, promotionData);
      refresh();
    } catch (e) {
      console.error("Failed to promote intern:", e);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (departmentFilter ? emp.department === departmentFilter : true) &&
    emp.isActive !== false
  );

  return (
    <div className="empmgmt-container">
      <h1 className="empmgmt-page-title">Employee Management</h1>

      {/* Dashboard Stats */}
      <div className="empmgmt-dashboard-grid">
        <div className="empmgmt-stat-card empmgmt-stat-blue">
          <h3 className="empmgmt-stat-title">Total Employees</h3>
          <p className="empmgmt-stat-value">{stats.totalEmployees}</p>
        </div>
        <div className="empmgmt-stat-card empmgmt-stat-green">
          <h3 className="empmgmt-stat-title">Total Interns</h3>
          <p className="empmgmt-stat-value">{stats.totalInterns}</p>
        </div>
        <div className="empmgmt-stat-card empmgmt-stat-purple">
          <h3 className="empmgmt-stat-title">Departments</h3>
          <p className="empmgmt-stat-value">{Object.keys(stats.departments).length}</p>
        </div>
        <div className="empmgmt-stat-card empmgmt-stat-yellow">
          <h3 className="empmgmt-stat-title">Average Salary</h3>
          <p className="empmgmt-stat-value">
            ${employees.length ? 
              (employees.reduce((sum, emp) => sum + Number(emp.salary || 0), 0) / 
              employees.length).toFixed(2) : 0}
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
        <select
          className="empmgmt-filter-select"
          value={employeeTypeFilter}
          onChange={(e) => setEmployeeTypeFilter(e.target.value)}
        >
          {employeeTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        <button
          className="empmgmt-add-button"
          onClick={() => setShowForm(true)}
          disabled={creating || updating}
        >
          {creating ? 'Adding...' : 'Add Employee'}
        </button>
      </div>

      {/* Error Display */}
      {(error || createError || updateError || deleteError || promoteError) && (
        <div className="empmgmt-error-alert">
          {error || createError || updateError || deleteError || promoteError}
        </div>
      )}

      {/* Loading Indicator */}
      {(loading || creating || updating || deleting || promoting) && (
        <div className="empmgmt-loading-indicator">Loading...</div>
      )}

      {/* Employee Form */}
      {showForm && (
        <EmployeeForm
          onSave={selectedEmployee ? handleUpdateEmployee : handleAddEmployee}
          onCancel={() => {
            setShowForm(false);
            setSelectedEmployee(null);
          }}
          employee={selectedEmployee}
          departments={departments}
          loading={creating || updating}
        />
      )}

      {/* Employee List */}
      <EmployeeList
        employees={filteredEmployees}
        onEdit={(emp) => {
          setSelectedEmployee(emp);
          setShowForm(true);
        }}
        onDelete={handleDeleteEmployee}
        onPromote={handlePromoteIntern}
        loading={deleting || promoting}
      />
    </div>
  );
};

export default Employees;