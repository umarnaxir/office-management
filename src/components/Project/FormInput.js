import React from "react";

export default function FormInput({ form, handleChange, handleSubmit, handlePrefill, handleReset, editIndex }) {
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">{editIndex !== null ? "Resubmit" : "Submit"}</button>
        <button type="button" onClick={handlePrefill}>Prefill</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}