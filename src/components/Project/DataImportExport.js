'use client';

import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

const DataImportExport = ({ data, columns, onImport, onClose }) => {
  const [importData, setImportData] = useState('');
  const [error, setError] = useState('');

  const handleImport = () => {
    try {
      const parsedData = JSON.parse(importData);
      if (Array.isArray(parsedData)) {
        onImport(parsedData);
        onClose();
      } else {
        setError('Imported data must be an array of objects');
      }
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  const exportData = data.map(row => {
    const exportedRow = {};
    columns.forEach(col => {
      exportedRow[col] = row[col] || '';
    });
    return exportedRow;
  });

  return (
    <div className="data-import-export">
      <h2>Import/Export Data</h2>
      
      <div className="import-section">
        <h3>Import Data</h3>
        <textarea 
          value={importData} 
          onChange={(e) => setImportData(e.target.value)} 
          placeholder="Paste JSON data here"
        />
        {error && <div className="error">{error}</div>}
        <button onClick={handleImport}>Import</button>
      </div>
      
      <div className="export-section">
        <h3>Export Data</h3>
        <CSVLink 
          data={exportData} 
          filename="office-data.csv"
          className="export-button"
        >
          Export to CSV
        </CSVLink>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(data, null, 2));
          }}
        >
          Copy JSON to Clipboard
        </button>
        <button onClick={() => window.print()}>Print Data</button>
      </div>
      
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DataImportExport;
