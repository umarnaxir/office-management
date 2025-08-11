import { useState } from "react";
import { addLeave } from "../services/leaveServices";

export const useCreateLeaves = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLeave = async (leaveData) => {
    setLoading(true);
    setError(null);
    
    try {
      const docId = await addLeave(leaveData);
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
    createLeave
  };
};