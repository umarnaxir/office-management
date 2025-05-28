import React from "react";

const generateUUID = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export default function SubmissionList({ submissions, handleEdit, handleDelete, editIndex, handleReset }) {
  return (
    <div>
      <h3>All Submissions:</h3>
      {submissions.map((entry, index) => {
        const isUmar = entry.name === "Umar";

        return (
          <div key={generateUUID()} className="submission-entry">
            <div className="submission-actions">
              <button onClick={() => handleEdit(index)} title="Edit">Edit</button>
              <button onClick={() => handleDelete(index)} title="Delete">Clear</button>
            </div>
            <p className={isUmar ? "highlight-name" : ""}><strong>Name:</strong> {entry.name}</p>
            <p><strong>Last Name:</strong> {entry.lastName}</p>
            <p><strong>Email:</strong> {entry.email}</p>
          </div>
        );
      })}
    </div>
  );
}
