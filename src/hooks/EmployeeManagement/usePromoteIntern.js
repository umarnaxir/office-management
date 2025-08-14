import { useState } from "react";
import { promoteIntern } from "../../services/employeesManagementServices";

export const usePromoteIntern = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const promoteInternRecord = async (id, promotionData) => {
    setLoading(true);
    setError(null);
    
    try {
      await promoteIntern(id, promotionData);
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
    promoteInternRecord
  };
};