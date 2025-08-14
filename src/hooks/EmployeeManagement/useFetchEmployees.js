import { useState, useEffect } from "react";
import { fetchEmployees, fetchDepartmentStats } from "../../services/employeesManagementServices";

export const useFetchEmployees = (type = null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({
    departments: {},
    totalEmployees: 0,
    totalInterns: 0
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [employeesData, statsData] = await Promise.all([
          fetchEmployees(type),
          fetchDepartmentStats()
        ]);
        setEmployees(employeesData);
        setStats(statsData);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [type]);

  const refresh = async () => {
    try {
      setLoading(true);
      const [employeesData, statsData] = await Promise.all([
        fetchEmployees(type),
        fetchDepartmentStats()
      ]);
      setEmployees(employeesData);
      setStats(statsData);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    employees,
    stats,
    refresh
  };
};