import React from 'react';

const DocumentUploadList = ({ documents, onDelete }) => {
  return (
    <div className="document-list">
      <h2>Uploaded Documents</h2>

      <table className="table-documents">
        <thead>
          <tr>
            <th>Category</th>
            <th>File Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td>{doc.category}</td>
              <td>{doc.uploadFile ? doc.uploadFile.name : 'N/A'}</td>
              <td>
                <button onClick={() => onDelete(doc.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentUploadList;
