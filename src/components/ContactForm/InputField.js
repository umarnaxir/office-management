import React from 'react';

const InputField = ({ label, name, type, value, onChange, error }) => {
  const handleInput = (e) => {
    if (name === 'phone') {
      e.target.value = e.target.value.replace(/\D/g, '');
    }
    onChange(e);
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <label>{label}</label><br />
      <input
        type={type}
        name={name}
        value={value}
        maxLength={name === 'phone' ? 10 : undefined}
        onChange={handleInput}
        style={{
          width: '90%',
          padding: '10px',
          borderColor: error ? 'red' : '#ccc',
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      />
      {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
    </div>
  );
};

export default InputField;