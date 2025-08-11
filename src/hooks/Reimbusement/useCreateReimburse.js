import { useState } from "react";
import { addReimbursement } from "../../services/reimburseServices";
import { addBusinessDays } from "date-fns";

export const useCreateReimburse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReimbursement = async (reimbursementData, businessDaysToAdd = 3) => {
    setLoading(true);
    setError(null);
    
    try {
      const followUpDate = addBusinessDays(new Date(), businessDaysToAdd);
      
      const newReimbursement = {
        employeeName: reimbursementData.employeeName || '',
        description: reimbursementData.description || '',
        amount: parseFloat(reimbursementData.amount) || 0,
        category: reimbursementData.category || '',
        date: reimbursementData.date || new Date().toISOString().split('T')[0],
        status: reimbursementData.status || 'pending',
        receiptFile: reimbursementData.receiptFile || null,
        createdAt: new Date().toISOString(),
        followUpDate: followUpDate.toISOString(),
      };
      
      const docId = await addReimbursement(newReimbursement);
      return docId;
    } catch (e) {
      const errorMessage = e.message || "Failed to create reimbursement";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createReimbursement
  };
};