import React, { useState } from "react";
import FormInput from "@/Components/FormSubmission/FormInput";
import SubmissionList from "@/Components/FormSubmission/SubmissionList";

export default function FormSubmission() {
  const [form, setForm] = useState({ name: "", lastName: "", email: "" });
  const [formErrors, setFormErrors] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert("Please tick the checkbox to submit.");
      return;
    }

    const errors = {};
    if (!form.name.trim()) errors.name = "Please enter your name.";
    if (!form.lastName.trim()) errors.lastName = "Please enter your last name.";
    if (!form.email.trim()) errors.email = "Please enter your email.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editIndex !== null) {
      const updatedSubmissions = [...submissions];
      updatedSubmissions[editIndex] = form;
      setSubmissions(updatedSubmissions);
      setEditIndex(null);
    } else {
      setSubmissions([form, ...submissions]);
    }

    setForm({ name: "", lastName: "", email: "" });
    setFormErrors({});
    setIsChecked(false);
  };

  const handleEdit = (index) => {
    setForm(submissions[index]);
    setEditIndex(index);
    setIsChecked(true);
  };

  const handleReset = () => {
    setForm({ name: "", lastName: "", email: "" });
    setFormErrors({});
    setEditIndex(null);
    setIsChecked(false);
  };

  const handlePrefill = () => {
    setForm({ name: "Umar", lastName: "Nazir", email: "umarnazir@gmail.com" });
    setFormErrors({});
    setEditIndex(null);
    setIsChecked(false);
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

  //Sort submissions alphabetically by name
  const handleSort = () => {
    const sorted = [...submissions].reverse().sort((a, b) => a.name.localeCompare(b.name));
    setSubmissions(sorted);
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
        isChecked={isChecked}
        handleCheckboxChange={handleCheckboxChange}
      />

      {submissions.length > 0 && (
        <SubmissionList
          submissions={submissions}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          editIndex={editIndex}
          handleReset={handleReset}
          handleSort={handleSort} // ✅ passing sort function
        />
      )}
    </div>
  );
}
