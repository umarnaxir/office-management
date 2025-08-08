import { useState } from "react";
import { updateExpense } from "../services/expenseService";

export const useUpdateExpenses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateExpenseRecord = async (id, updateData) => {
    setLoading(true);
    setError(null);
    
    try {
      await updateExpense(id, updateData);
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
    updateExpenseRecord
  };
};