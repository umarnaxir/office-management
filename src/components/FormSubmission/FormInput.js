import React from "react";

export default function FormInput({
  form,
  formErrors,
  handleChange,
  handleSubmit,
  handlePrefill,
  handleReset,
  editIndex,
  isFormComplete,
}) {
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
            style={{
              borderColor: formErrors.name ? "red" : "#ccc",
            }}
          />
        </label>
        {formErrors.name && <p style={{ color: "red" }}>{formErrors.name}</p>}
      </div>

      <div className="form-group">
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            style={{
              borderColor: formErrors.lastName ? "red" : "#ccc",
            }}
          />
        </label>
        {formErrors.lastName && (
          <p style={{ color: "red" }}>{formErrors.lastName}</p>
        )}
      </div>

      <div className="form-group">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{
              borderColor: formErrors.email ? "red" : "#ccc",
            }}
          />
        </label>
        {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}
      </div>

      <div className="form-actions">
        <button type="submit" disabled={!isFormComplete}>
          {editIndex !== null ? "Resubmit" : "Submit"}
        </button>
        <button type="button" onClick={handlePrefill}>
          Prefill
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}
