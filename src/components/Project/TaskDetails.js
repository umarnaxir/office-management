'use client';

import React from 'react';

const TaskDetails = ({ task, onClose }) => {
  return (
    <div className="task-details">
      <h2>Task Details</h2>
      <div className="details-container">
        <div className="detail-item">
          <span>Title:</span>
          <span>{task.title}</span>
        </div>
        <div className="detail-item">
          <span>Description:</span>
          <span>{task.description}</span>
        </div>
        <div className="detail-item">
          <span>Assigned To:</span>
          <span>{task.assignedTo}</span>
        </div>
        <div className="detail-item">
          <span>Deadline:</span>
          <span>{task.deadline}</span>
        </div>
        <div className="detail-item">
          <span>Priority:</span>
          <span>{task.priority}</span>
        </div>
        <div className="detail-item">
          <span>Status:</span>
          <span>{task.status}</span>
        </div>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TaskDetails;
