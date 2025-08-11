"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextInput } from "../Inputs/TextInput";
import PasswordInput from "../Inputs/PasswordInput";
import { SelectInput } from "../Inputs/SelectInput";
import { useAddEmployees } from "@/hooks/Employees/useAddEmployees";

const initialValues = {
  employeeId: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  role: "",
};

const roleOptions = [
  { value: "EMPLOYEE", label: "Employee" },
  { value: "INTERN", label: "Intern" },
  { value: "HR", label: "HR" },
];

const RegistrationForm = () => {
  const [status, setStatus] = useState("");
  const {createEmployee} = useAddEmployees();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setStatus("Processing registration...");
    try {
      await createEmployee(values);
      alert("Success");
    } catch (e) {
      console.log(e);
      alert(e instanceof Error ? e.message : "Failed");
    }
  };

  return (
    <div className="auth-register-container">
      <h2 className="auth-register-title">Register</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="auth-register-form">
            <TextInput
              name="employeeId"
              label="Employee ID"
              placeholder="Enter employee ID"
              type="text"
            />
            <div className="auth-register-row">
              <TextInput
                name="firstName"
                label="First Name"
                placeholder="Enter first name"
                type="text"
              />
              <TextInput
                name="lastName"
                label="Last Name"
                placeholder="Enter last name"
                type="text"
              />
            </div>
            <div className="auth-register-row">
              <TextInput
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                type="email"
              />
              <TextInput
                name="phone"
                label="Phone Number"
                placeholder="Enter phone number"
                type="tel"
              />
            </div>
            <div className="auth-register-row">
              <PasswordInput
                name="password"
                label="Password"
                placeholder="Set your password"
              />
              <SelectInput name="role" label="Role" options={roleOptions} />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="auth-register-submit-btn"
            >
              {isSubmitting ? "Creating Account..." : "Register"}
            </button>
            {status && (
              <p
                className={`auth-register-status ${
                  status.includes("successful") ? "success" : ""
                }`}
              >
                {status}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;