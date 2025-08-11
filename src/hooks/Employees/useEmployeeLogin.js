import { useState } from 'react';
import { userLogin } from '../../services/employeeService';
import { useRouter } from 'next/router';

// Changed from named export to default export
const useEmployeeLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const loginEmployee = async (email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await userLogin(email, password);
      localStorage.setItem('isAuthenticated', 'true');
      setSuccess('Login successful!');
      router.push('/dashboard');
      return response;
    } catch (e) {
      console.error('Login error:', e);
      setError(e.message || 'Login failed');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    loginEmployee
  };
};

export default useEmployeeLogin; // Changed to default export