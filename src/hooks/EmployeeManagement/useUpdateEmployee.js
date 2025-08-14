import { useState } from "react";
import { updateEmployee } from "../../services/employeesManagementServices";

export const useUpdateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateEmployeeRecord = async (id, updateData) => {
    setLoading(true);
    setError(null);
    
    try {
      await updateEmployee(id, updateData);
      return true;
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
    updateEmployeeRecord
  };
};