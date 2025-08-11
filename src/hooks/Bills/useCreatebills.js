import { useState } from "react";
import { addBill } from "../../services/billServices";

export const useCreateBills = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBill = async (billData) => {
    setLoading(true);
    setError(null);
    
    try {
      const docId = await addBill(billData);
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
    createBill
  };
};