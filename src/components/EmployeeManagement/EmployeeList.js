import { useState } from 'react';
import PromotionForm from './PromotionForm';

const EmployeeList = ({ employees, onEdit, onDelete, onPromote, loading }) => {
  const [promotionCandidate, setPromotionCandidate] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handlePromoteClick = (emp) => {
    if (emp.type === 'intern') {
      setPromotionCandidate(emp);
    }
  };

  const handlePromotionSubmit = (promotionData) => {
    onPromote(promotionCandidate.id, promotionData);
    setPromotionCandidate(null);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'salary') {
      aValue = Number(aValue) || 0;
      bValue = Number(bValue) || 0;
    } else {
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Format currency in Indian Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date in Indian format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="empmgmt-employee-list">
      <div className="empmgmt-list-header">
        <div className="empmgmt-list-title-section">
          <h2 className="empmgmt-list-title">
            Employee Directory
          </h2>
          <div className="empmgmt-employee-count">
            Total: {employees.length} employees
          </div>
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="empmgmt-empty-state">
          <h3>No employees found</h3>
          <p>Start by adding your first employee to the system.</p>
        </div>
      ) : (
        <div className="empmgmt-table-container">
          <table className="empmgmt-table-employee">
            <thead>
              <tr>
                <th 
                  className="empmgmt-sortable-header" 
                  onClick={() => handleSort('name')}
                >
                  <span>Name {getSortIcon('name')}</span>
                </th>
                <th 
                  className="empmgmt-sortable-header" 
                  onClick={() => handleSort('email')}
                >
                  <span>Email {getSortIcon('email')}</span>
                </th>
                <th 
                  className="empmgmt-sortable-header" 
                  onClick={() => handleSort('department')}
                >
                  <span>Department {getSortIcon('department')}</span>
                </th>
                <th 
                  className="empmgmt-sortable-header" 
                  onClick={() => handleSort('position')}
                >
                  <span>Position {getSortIcon('position')}</span>
                </th>
                <th 
                  className="empmgmt-sortable-header" 
                  onClick={() => handleSort('type')}
                >
                  <span>Type {getSortIcon('type')}</span>
                </th>
                <th 
                  className="empmgmt-sortable-header" 
                  onClick={() => handleSort('joiningDate')}
                >
                  <span>Joining Date {getSortIcon('joiningDate')}</span>
                </th>
                <th 
                  className="empmgmt-sortable-header" 
                  onClick={() => handleSort('salary')}
                >
                  <span>Salary {getSortIcon('salary')}</span>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map(emp => (
                <tr key={emp.id} className="empmgmt-table-row">
                  <td className="empmgmt-name-cell">
                    <div className="empmgmt-employee-avatar">
                      {emp.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="empmgmt-employee-info">
                      <div className="empmgmt-employee-name">{emp.name}</div>
                    </div>
                  </td>
                  <td className="empmgmt-email-cell">
                    <a href={`mailto:${emp.email}`} className="empmgmt-email-link">
                      {emp.email}
                    </a>
                  </td>
                  <td className="empmgmt-department-cell">
                    <span className="empmgmt-department-badge">
                      {emp.department}
                    </span>
                  </td>
                  <td className="empmgmt-position-cell">{emp.position}</td>
                  <td className="empmgmt-type-cell">
                    <span className={`empmgmt-type-badge ${emp.type === 'intern' ? 'intern' : 'fulltime'}`}>
                      {emp.type === 'intern' ? 'Intern' : 'Full-time'}
                    </span>
                  </td>
                  <td className="empmgmt-date-cell">{formatDate(emp.joiningDate)}</td>
                  <td className="empmgmt-salary-cell">
                    <span className="empmgmt-salary-amount">
                      {formatCurrency(emp.salary)}
                    </span>
                  </td>
                  <td className="empmgmt-actions-cell">
                    <div className="empmgmt-action-buttons">
                      <button 
                        className="empmgmt-edit-button" 
                        onClick={() => onEdit(emp)}
                        disabled={loading}
                        title="Edit employee"
                      >
                        Edit
                      </button>
                      <button 
                        className="empmgmt-delete-button" 
                        onClick={() => onDelete(emp.id)}
                        disabled={loading}
                        title="Delete employee"
                      >
                        Delete
                      </button>
                      {emp.type === 'intern' && (
                        <button 
                          className="empmgmt-promote-button" 
                          onClick={() => handlePromoteClick(emp)}
                          disabled={loading}
                          title="Promote intern"
                        >
                          Promote
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {promotionCandidate && (
        <div className="empmgmt-modal-overlay">
          <div className="empmgmt-modal">
            <PromotionForm
              employee={promotionCandidate}
              onSave={handlePromotionSubmit}
              onCancel={() => setPromotionCandidate(null)}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;