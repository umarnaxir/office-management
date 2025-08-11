import { useState } from "react";
import { updateLeaveStatus } from "../services/leaveServices";

export const useUpdateLeaves = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateLeave = async (id, status) => {
    setLoading(true);
    setError(null);
    
    try {
      await updateLeaveStatus(id, status);
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
    updateLeave
  };
};