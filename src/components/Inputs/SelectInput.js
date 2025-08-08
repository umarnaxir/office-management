import React from "react";
import { useField } from "formik";

export const SelectInput = ({ name, label, options }) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && !!meta.error;

  return (
    <div className="auth-register-field-group">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label htmlFor={name} className="auth-register-label">
          {label}
        </label>
        {hasError && <p style={{ color: "red" }}>{meta.error}</p>}
      </div>
      <select
        {...field}
        id={name}
        name={name}
        value={field.value}
        className="auth-register-select"
      >
        <option value="" disabled>
          Select Role
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;