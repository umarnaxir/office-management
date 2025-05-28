import React, { useState } from "react";
import FormInput from "@/Components/FormSubmission/FormInput";
import SubmissionList from "@/Components/FormSubmission/SubmissionList";

export default function FormSubmission() {
  const [form, setForm] = useState({ name: "", lastName: "", email: "" });
  const [formErrors, setFormErrors] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Clear individual error on typing
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    const errors = {};
    if (!form.name.trim()) errors.name = "Please enter your name.";
    if (!form.lastName.trim()) errors.lastName = "Please enter your last name.";
    if (!form.email.trim()) errors.email = "Please enter your email.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // stop submission
    }

    if (editIndex !== null) {
      const updatedSubmissions = [...submissions];
      updatedSubmissions[editIndex] = form;
      setSubmissions(updatedSubmissions);
      setEditIndex(null);
    } else {
      setSubmissions([...submissions, form]);
    }

    setForm({ name: "", lastName: "", email: "" });
    setFormErrors({});
  };

  const handleEdit = (index) => {
    setForm(submissions[index]);
    setEditIndex(index);
  };

  const handleReset = () => {
    setForm({ name: "", lastName: "", email: "" });
    setFormErrors({});
    setEditIndex(null);
  };

  const handlePrefill = () => {
    setForm({ name: "Umar", lastName: "Nazir", email: "umarnazir@gmail.com" });
    setFormErrors({});
    setEditIndex(null);
  };

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