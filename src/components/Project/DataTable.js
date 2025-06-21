'use client';

import React, { useState } from 'react';

const DataTable = ({ data, columns, onAddRow, onUpdateRow, onDeleteRow, onAddColumn }) => {
  const [newColumnName, setNewColumnName] = useState('');

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      onAddColumn(newColumnName);
      setNewColumnName('');
    }
  };

  const handleAddRow = () => {
    const newRow = columns.reduce((obj, col) => {
      obj[col] = '';
      return obj;
    }, {});
    onAddRow(newRow);
  };

  const handleCellChange = (rowIndex, column, value) => {
    const updatedRow = { ...data[rowIndex], [column]: value };
    onUpdateRow(rowIndex, updatedRow);
  };

  return (
    <div className="data-table">
      <h2>Office Data Table</h2>
      
      <div className="table-controls">
        <div className="add-column">
          <input 
            type="text" 
            value={newColumnName} 
            onChange={(e) => setNewColumnName(e.target.value)} 
            placeholder="New column name" 
          />
          <button onClick={handleAddColumn}>Add Column</button>
        </div>
        <button onClick={handleAddRow}>Add Row</button>
      </div>
      
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  <input 
                    type="text" 
                    value={row[col] || ''} 
                    onChange={(e) => handleCellChange(rowIndex, col, e.target.value)} 
                  />
                </td>
              ))}
              <td>
                <button onClick={() => onDeleteRow(rowIndex)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
