import React from 'react';

const InputField = ({ label, name, type, value, onChange }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label>{label}</label><br />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        style={{ width: '90%', padding: '10px' }}
      />
    </div>
  );
};

export default InputField;
