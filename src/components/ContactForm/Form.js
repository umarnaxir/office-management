import React, { useState } from 'react';
import InputField from './InputField';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error on input change
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please fill out this field.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please fill out this field.';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }
    if (!formData.email.trim()) newErrors.email = 'Please fill out this field.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://eoucyfvf99xf6ze.m.pipedream.net', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Submitted successfully!');
        setFormData({ name: '', phone: '', email: '' });
        setErrors({});
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
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '350px',
        margin: '50px auto',
        padding: '20px',
        background: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0 0 10px #ccc',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Contact Form</h2>

      <InputField
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      <InputField
        label="Phone Number"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
      />

      <InputField
        label="Email ID"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '96%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginTop: '10px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {message && (
        <p style={{ marginTop: '10px', color: message.includes('success') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </form>
  );
};

export default Form;