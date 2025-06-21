'use client';

import React, { useState } from 'react';
import DataTable from '../Project/DataTable';
import DataImportExport from '../Project/DataImportExport';

const DataManagement = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState(['Name', 'Value', 'Description']);
  const [showImportExport, setShowImportExport] = useState(false);

  const addRow = (rowData) => {
    setTableData([...tableData, rowData]);
  };

  const updateRow = (index, rowData) => {
    const newData = [...tableData];
    newData[index] = rowData;
    setTableData(newData);
  };

  const deleteRow = (index) => {
    const newData = tableData.filter((_, i) => i !== index);
    setTableData(newData);
  };

  const addColumn = (columnName) => {
    setColumns([...columns, columnName]);
  };

  return (
    <div className="data-management">
      <h1>Data Management</h1>
      
      <button onClick={() => setShowImportExport(true)}>Import/Export Data</button>
      
      <DataTable 
        data={tableData} 
        columns={columns} 
        onAddRow={addRow}
        onUpdateRow={updateRow}
        onDeleteRow={deleteRow}
        onAddColumn={addColumn}
      />
      
      {showImportExport && (
        <DataImportExport 
          data={tableData}
          columns={columns}
          onImport={(importedData) => setTableData(importedData)}
          onClose={() => setShowImportExport(false)}
        />
      )}
    </div>
  );
};

export default DataManagement;
