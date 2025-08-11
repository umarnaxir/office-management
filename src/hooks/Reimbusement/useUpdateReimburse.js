import { useState } from "react";
import { updateReimbursement } from "../../services/reimburseServices";

export const useUpdateReimburse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateReimbursementData = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    
    console.log('useUpdateReimburse: Starting update process for ID:', id, 'with data:', updatedData);
    
    try {
      // Validate that we have an ID
      if (!id) {
        throw new Error('Reimbursement ID is required');
      }
      
      // Call the service function to update in Firebase
      await updateReimbursement(id, updatedData);
      
      console.log('useUpdateReimburse: Successfully updated reimbursement');
      setError(null);
      
      return true;
    } catch (e) {
      console.error("useUpdateReimburse: Failed to update reimbursement:", e);
      const errorMessage = e.message || "An error occurred while updating the reimbursement";
      setError(errorMessage);
      
      // Re-throw the error so the component can handle it
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to clear error state
  const clearError = () => {
    setError(null);
  };

  return {
    loading,
    error,
    updateReimbursementData,
    clearError
  };
};