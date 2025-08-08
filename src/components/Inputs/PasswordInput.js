import React, { useState } from "react";
import { useField } from "formik";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ name, label, placeholder }) => {
  const [field, meta, helpers] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const hasError = meta.touched && !!meta.error;

  return (
    <div className="auth-login-field-group">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <label htmlFor={name} className="auth-login-label">{label}</label>
        {hasError && (
          <p style={{ color: 'red' }}>{meta.error}</p>
        )}
      </div>
      <div className="password-input-wrapper">
        <input
          {...field}
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          placeholder={placeholder}
          className="auth-login-input password-input"
          autoComplete="current-password"
        />
        <button
          type="button"
          className="password-eye-btn"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={0}
        >
          {showPassword ? (
            <EyeOff size={22} className="password-eye-icon" />
          ) : (
            <Eye size={22} className="password-eye-icon" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;