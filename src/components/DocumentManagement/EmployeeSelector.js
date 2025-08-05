import React from 'react';

const EmployeeSelector = ({ employees, selectedEmployee, onSelectEmployee }) => {
  return (
    <div className="doc-manage-employee-selector">
      <label htmlFor="doc-manage-employee-select" className="doc-manage-employee-label">Select Employee:</label>
      <select
        id="doc-manage-employee-select"
        className="doc-manage-employee-dropdown"
        value={selectedEmployee}
        onChange={(e) => onSelectEmployee(e.target.value)}
      >
        <option value="">All Employees</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.id}>
            {emp.name}
          </option>
        ))}
      </select>
      {selectedEmployee && (
        <button 
          className="doc-manage-clear-selection"
          onClick={() => onSelectEmployee('')}
        >
          Clear Selection
        </button>
      )}
    </div>
  );
};

export default EmployeeSelector;