import { useEffect, useState } from "react";


export const useEmployees = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetchEmployees();
      setEmployees(response || []);
    } catch (e) {
      
      console.error("Failed to fetch employees:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      await getEmployees();
    };
    fetchData(); // Call it
  }, []);

  return {
    loading,
    employees,
  };
};
