import { useState } from "react";
import { updateBill } from "../../services/billServices";

export const useUpdateBills = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBillRecord = async (id, updateData) => {
    setLoading(true);
    setError(null);
    
    try {
      await updateBill(id, updateData);
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
    updateBill: updateBillRecord
  };
};