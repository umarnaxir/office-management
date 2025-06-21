'use client';

import React from 'react';

const TaskList = ({ tasks, onSelect, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="task-list">
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.assignedTo}</td>
              <td>{task.deadline}</td>
              <td>
                <select 
                  value={task.status} 
                  onChange={(e) => onStatusChange(task.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td>
                <button onClick={() => onSelect(task)}>View</button>
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
