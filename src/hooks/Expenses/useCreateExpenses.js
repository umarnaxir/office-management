import { useState } from "react";
import { addExpense } from "../../services/expenseService";

export const useCreateExpenses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createExpense = async (expenseData) => {
    setLoading(true);
    setError(null);
    
    try {
      const docId = await addExpense(expenseData);
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
    createExpense
  };
};