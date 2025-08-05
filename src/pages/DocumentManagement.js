import React, { useState } from 'react';
import DocumentUploadForm from '../components/DocumentManagement/DocumentUploadForm';
import DocumentList from '../components/DocumentManagement/DocumentUploadList';
import DocumentStats from '../components/DocumentManagement/DocumentStats';
import EmployeeSelector from '../components/DocumentManagement/EmployeeSelector';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [activeTab, setActiveTab] = useState('upload');

  const employees = [
    { id: 'emp1', name: 'John Doe' },
    { id: 'emp2', name: 'Jane Smith' },
    { id: 'emp3', name: 'Robert Johnson' },
    { id: 'emp4', name: 'Emily Davis' },
    { id: 'emp5', name: 'Michael Brown' },
    { id: 'emp6', name: 'Sarah Wilson' },
    { id: 'emp7', name: 'David Taylor' },
    { id: 'emp8', name: 'Jessica Anderson' },
    { id: 'emp9', name: 'Thomas Martinez' },
    { id: 'emp10', name: 'Lisa Thomas' }
  ];

  const addDocument = (doc) => {
    const newDoc = {
      ...doc,
      id: Date.now(),
      employeeId: selectedEmployee,
      uploadDate: new Date().toISOString(),
      status: 'Active'
    };
    setDocuments([...documents, newDoc]);
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  const updateDocumentStatus = (id, status) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, status } : doc
    ));
  };

  const filteredDocuments = selectedEmployee 
    ? documents.filter(doc => doc.employeeId === selectedEmployee)
    : documents;

  return (
    <div className="doc-manage-container">
      <h1 className="doc-manage-title">Document Management System</h1>
      
      <EmployeeSelector 
        employees={employees}
        selectedEmployee={selectedEmployee}
        onSelectEmployee={setSelectedEmployee}
      />
      
      <div className="doc-manage-tabs">
        <button 
          className={`doc-manage-tab ${activeTab === 'upload' ? 'doc-manage-tab-active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload Documents
        </button>
        <button 
          className={`doc-manage-tab ${activeTab === 'manage' ? 'doc-manage-tab-active' : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          Manage Documents
        </button>
        <button 
          className={`doc-manage-tab ${activeTab === 'stats' ? 'doc-manage-tab-active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
      </div>
      
      <div className="doc-manage-content">
        {activeTab === 'upload' && (
          <DocumentUploadForm 
            onSave={addDocument} 
            selectedEmployee={selectedEmployee}
          />
        )}
        
        {activeTab === 'manage' && (
          <DocumentList 
            documents={filteredDocuments} 
            onDelete={deleteDocument}
            onStatusChange={updateDocumentStatus}
            employees={employees}
          />
        )}
        
        {activeTab === 'stats' && (
          <DocumentStats 
            documents={filteredDocuments}
            employees={employees}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentManagement;