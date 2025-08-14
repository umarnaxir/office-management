import { useState } from "react";
import { addEmployee } from "../../services/employeesManagementServices";

export const useCreateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createEmployee = async (employeeData) => {
    setLoading(true);
    setError(null);
    
    try {
      const docId = await addEmployee(employeeData);
      return docId;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createEmployee
  };
};