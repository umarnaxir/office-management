import React, { useState } from 'react';
import InputField from './InputField';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Update state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setLoading(true);   // Show loading spinner or disable button
    setMessage('');     // Clear previous messages

    try {
      // Replace with your actual backend URL
      const response = await fetch('http://192.168.1.19:8000/submit', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData), 
      });

      const result = await response.json(); 

      if (response.ok) {
        setMessage(result.note);
        setFormData({ name: '', phone: '', email: '' }); // Clear form
      } else {
        setMessage(`Submission failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: '350px',
      margin: '50px auto',
      padding: '20px',
      background: '#f4f4f4',
      borderRadius: '10px',
      boxShadow: '0 0 10px #ccc',
    }}>
      <h2 style={{ textAlign: 'center' }}>Contact Form</h2>

      <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />
      <InputField label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      <InputField label="Email ID" type="email" name="email" value={formData.email} onChange={handleChange} />

      <button type="submit" disabled={loading} style={{
        width: '96%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        marginTop: '10px',
        cursor: 'pointer'
      }}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}

      <h1>{message}</h1>
    </form>
  );
};

export default Form;
