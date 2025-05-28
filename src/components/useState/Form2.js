import React, { useState } from "react";

export default function FormSubmission() {
  const [form, setForm] = useState({ name: "", lastName: "", email: "" });
  const [submissions, setSubmissions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updatedSubmissions = [...submissions];
      updatedSubmissions[editIndex] = form;
      setSubmissions(updatedSubmissions);
      setEditIndex(null);
    } else {
      setSubmissions([...submissions, form]);
    }

    setForm({ name: "", lastName: "", email: "" });
  };

  const handleEdit = (index) => {
    setForm(submissions[index]);
    setEditIndex(index);
  };

  const handleReset = () => {
    setForm({ name: "", lastName: "", email: "" });
    setEditIndex(null);
  };

  const handlePrefill = () => {
    setForm({ name: "Umar", lastName: "Nazir", email: "umarnazir@gmail.com" });
    setEditIndex(null);
  };

  const handleDelete = (indexToDelete) => {
    if (submissions.length <= 1) {
      alert("sorry you can not clear last one.");
      return;
    }

    const updatedSubmissions = submissions.filter((_, index) => index !== indexToDelete);
    setSubmissions(updatedSubmissions);

    if (editIndex === indexToDelete) {
      handleReset();
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Name:{" "}
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ padding: "5px", marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Last Name:{" "}
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              style={{ padding: "5px", marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Email:{" "}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ padding: "5px", marginLeft: "10px" }}
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={{ padding: "5px 10px", cursor: "pointer" }}>
            {editIndex !== null ? "Resubmit" : "Submit"}
          </button>
          <button type="button" onClick={handlePrefill} style={{ padding: "5px 10px", cursor: "pointer" }}>
            Prefill
          </button>
          <button type="button" onClick={handleReset} style={{ padding: "5px 10px", cursor: "pointer" }}>
            Reset
          </button>
        </div>
      </form>

      {submissions.length > 0 && (
        <div>
          <h3>All Submissions:</h3>
          {submissions.map((entry, index) => {
            const isUmar = entry.name === "Umar";

            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                {/* Button container */}
                <div style={{ position: "absolute", top: "5px", right: "10px", display: "flex", gap: "5px" }}>
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(index)}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      fontWeight: "bold",
                      border: "1px solid #000",
                    }}
                    title="Edit"
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      cursor: "pointer",
                      color: "red",
                      border: "1px solid #000",
                      fontWeight: "bold",
                    }}
                    title="Delete"
                  >
                    Clear
                  </button>
                </div>

                {/* Submission content */}
                <p
                  style={{
                    color: isUmar ? "red" : "black",
                    // fontSize: isUmar ? 22 : 14,
                  }}
                >
                  <strong>Name:</strong> {entry.name}
                </p>
                <p>
                  <strong>Last Name:</strong> {entry.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {entry.email}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
