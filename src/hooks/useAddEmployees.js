import { useState } from "react";
import {addEmployee}from "../services/employeeService"

export const useAddEmployees = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createEmployee = async (employeeData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addEmployee(employeeData);
      return response;
    } catch (e) {
      console.error("Failed to add employee:", e);
      setError(e.message || "An error occurred while adding the employee");
      throw new Error("Failed To Create Employee")
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createEmployee,
  };
};