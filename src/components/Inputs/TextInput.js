import React from "react";
import {useField}from "formik";

export const TextInput = ({ name, label, placeholder, type = "text" }) => {

const [field, meta, helpers]=useField(name)

const hasError = meta.touched && !!meta.error

  return (
    <div className="auth-login-field-group">
     <div style={{
        display:'flex',
        justifyContent: 'space-between',
        alignItems:'center'
     }}> 
     <label htmlFor={name} className="auth-login-label">{label}</label>
     {hasError && (<p style={{
        color:'red'
     }}>{meta.error}</p>)}
     </div>
      <input
      {...field}
        type={type}
        name={name}
        value={field.value}
        placeholder={placeholder}
        className="auth-login-input"
      />
    </div>
  );
};