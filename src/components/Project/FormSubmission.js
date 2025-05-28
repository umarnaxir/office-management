import React, { useState } from "react";
import FormInput from "@/Components/Project/FormInput";
import SubmissionList from "@/Components/Project/SubmissionList";

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
    <div className="container">
      <FormInput
        form={form}
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