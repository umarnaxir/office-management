import { useState } from "react";
import { deleteEmployee } from "../../services/employeesManagementServices";

export const useDeleteEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteEmployeeRecord = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await deleteEmployee(id);
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
    deleteEmployeeRecord
  };
};