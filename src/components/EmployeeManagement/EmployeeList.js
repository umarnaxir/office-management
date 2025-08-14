import { useState } from 'react';
import PromotionForm from './PromotionForm';

const EmployeeList = ({ employees, onEdit, onDelete, onPromote, loading }) => {
  const [promotionCandidate, setPromotionCandidate] = useState(null);

  const handlePromoteClick = (emp) => {
    if (emp.type === 'intern') {
      setPromotionCandidate(emp);
    }
  };

  const handlePromotionSubmit = (promotionData) => {
    onPromote(promotionCandidate.id, promotionData);
    setPromotionCandidate(null);
  };

  return (
    <div className="empmgmt-employee-list">
      <h2 className="empmgmt-list-title">Employee List</h2>
      <table className="empmgmt-table-employee">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Type</th>
            <th>Joining Date</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="empmgmt-table-row">
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>{emp.type === 'intern' ? 'Intern' : 'Full-time'}</td>
              <td>{emp.joiningDate}</td>
              <td>${emp.salary}</td>
              <td>
                <button 
                  className="empmgmt-edit-button" 
                  onClick={() => onEdit(emp)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button 
                  className="empmgmt-delete-button" 
                  onClick={() => onDelete(emp.id)}
                  disabled={loading}
                >
                  Delete
                </button>
                {emp.type === 'intern' && (
                  <button 
                    className="empmgmt-promote-button" 
                    onClick={() => handlePromoteClick(emp)}
                    disabled={loading}
                  >
                    Promote
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {promotionCandidate && (
        <PromotionForm
          employee={promotionCandidate}
          onSave={handlePromotionSubmit}
          onCancel={() => setPromotionCandidate(null)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default EmployeeList;