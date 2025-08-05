import React from 'react';
import { format } from 'date-fns';

const DocumentList = ({ documents, onDelete, onStatusChange, employees }) => {
  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  return (
    <div className="doc-manage-list-container">
      <h2 className="doc-manage-list-title">Manage Documents</h2>
      {documents.length === 0 ? (
        <div className="doc-manage-no-documents">No documents found</div>
      ) : (
        <div className="doc-manage-table-container">
          <table className="doc-manage-documents-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Category</th>
                <th>File Name</th>
                <th>Description</th>
                <th>Upload Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id} className={`doc-manage-status-${doc.status.toLowerCase()}`}>
                  <td>{getEmployeeName(doc.employeeId)}</td>
                  <td>{doc.category}</td>
                  <td>{doc.uploadFile ? doc.uploadFile.name : 'N/A'}</td>
                  <td>{doc.description || '-'}</td>
                  <td>{formatDate(doc.uploadDate)}</td>
                  <td>
                    <select
                      className="doc-manage-status-select"
                      value={doc.status}
                      onChange={(e) => onStatusChange(doc.id, e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Archived">Archived</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="doc-manage-download-btn"
                      onClick={() => alert('Download functionality would go here')}
                    >
                      Download
                    </button>
                    <button 
                      className="doc-manage-delete-btn"
                      onClick={() => onDelete(doc.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DocumentList;