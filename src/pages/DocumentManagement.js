import React, { useState } from 'react';
import DocumentUploadForm from '../components/DocumentUploadForm';
import DocumentList from '../components/DocumentUploadList';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);

  const addDocument = (doc) => {
    setDocuments([...documents, { ...doc, id: Date.now() }]);
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  return (
    <div className="page-document-management">
      <h1>Document Management</h1>

      <DocumentUploadForm onSave={addDocument} />

      <DocumentList documents={documents} onDelete={deleteDocument} />
    </div>
  );
};

export default DocumentManagement;
