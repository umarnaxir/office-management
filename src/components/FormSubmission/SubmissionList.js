import React from "react";

// Generate unique key — for demo/testing only; for production, use actual UUID
const generateUUID = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export default function SubmissionList({ submissions, handleEdit, handleDelete, editIndex, handleReset, handleSort }) {
  return (
    <div>
      <h3>All Submissions:</h3>

      {/* Sort Button */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={handleSort}
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "14px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Sort Submissions
        </button>
      </div>

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
