"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import { TextInput } from "../Inputs/TextInput";
import PasswordInput from "../Inputs/PasswordInput";
import { Formik, Form } from "formik";
import useEmployeeLogin from "../../hooks/Employees/useEmployeeLogin";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { loading, error, success, loginEmployee } = useEmployeeLogin();
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await loginEmployee(values.email, values.password);
    } catch (err) {
      // Error is already handled by the hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-login-container">
      <h2 className="auth-login-title">Login</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="auth-login-form">
            <div className="auth-login-row">
              <TextInput
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <PasswordInput
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="auth-login-submit-btn"
            >
              {isSubmitting || loading ? "Logging in..." : "Login"}
            </button>
            {(success || error) && (
              <p
                className={`auth-login-status ${
                  success ? "success" : "error"
                }`}
              >
                {success || (error === 'Employee data not found in database' 
                  ? 'No employee data found. Please register.' 
                  : error === 'Firebase: Error (auth/invalid-credential)'
                  ? 'Invalid email or password.'
                  : error === 'Firebase Auth is not initialized'
                  ? 'Authentication service is not properly configured. Contact support.'
                  : error)}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;