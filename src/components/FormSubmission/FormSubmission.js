import React, { useState } from "react";
import FormInput from "@/Components/FormSubmission/FormInput";
import SubmissionList from "@/Components/FormSubmission/SubmissionList";

export default function FormSubmission() {
  // Initial form state
  const [form, setForm] = useState({ name: "", lastName: "", email: "" });

  // To track field-specific errors
  const [formErrors, setFormErrors] = useState({});

  // Array of submission entries
  const [submissions, setSubmissions] = useState([]);

  // Track which submission is being edited
  const [editIndex, setEditIndex] = useState(null);

  // Handle input field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Clear individual error as user types
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!form.name.trim()) errors.name = "Please enter your name.";
    if (!form.lastName.trim()) errors.lastName = "Please enter your last name.";
    if (!form.email.trim()) errors.email = "Please enter your email.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // stop if validation fails
    }

    if (editIndex !== null) {
      // Edit existing entry
      const updatedSubmissions = [...submissions];
      updatedSubmissions[editIndex] = form;
      setSubmissions(updatedSubmissions);
      setEditIndex(null);
    } else {
      // Add new entry at the beginning (recent first)
      setSubmissions([form, ...submissions]);
    }

    // Reset form after submit
    setForm({ name: "", lastName: "", email: "" });
    setFormErrors({});
  };

  // Prefill dummy data
  const handlePrefill = () => {
    setForm({ name: "Umar", lastName: "Nazir", email: "umarnazir@gmail.com" });
    setFormErrors({});
    setEditIndex(null);
  };

  // Reset form state
  const handleReset = () => {
    setForm({ name: "", lastName: "", email: "" });
    setFormErrors({});
    setEditIndex(null);
  };

  // Load selected submission into form
  const handleEdit = (index) => {
    setForm(submissions[index]);
    setEditIndex(index);
  };

  // Delete specific submission
  const handleDelete = (indexToDelete) => {
    if (submissions.length <= 1) {
      alert("Sorry, you cannot clear the last one.");
      return;
    }
    const updatedSubmissions = submissions.filter((_, index) => index !== indexToDelete);
    setSubmissions(updatedSubmissions);
    if (editIndex === indexToDelete) {
      handleReset();
    }
  };

  // Determine if all form fields are filled
  const isFormComplete = form.name.trim() && form.lastName.trim() && form.email.trim();

  return (
    <div className="container">
      <FormInput
        form={form}
        formErrors={formErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handlePrefill={handlePrefill}
        handleReset={handleReset}
        editIndex={editIndex}
        isFormComplete={!!isFormComplete}
      />

      {submissions.length > 0 && (
        <SubmissionList
          submissions={submissions}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          editIndex={editIndex}
          handleReset={handleReset}
        />
      )}
    </div>
  );
}
