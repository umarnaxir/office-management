import React from 'react';
import { User, FileText, DollarSign, Activity, Calendar, Upload } from 'lucide-react';

const FormGroup = ({ children, label, icon, error }) => (
  <div className="form-group">
    <label>
      {icon && React.createElement(icon, { className: "label-icon" })}
      {label}
    </label>
    {children}
    {error && <div className="error-text">{error}</div>}
  </div>
);

export const TextInput = ({ label, name, icon, formik, placeholder, required = true }) => (
  <FormGroup label={label} icon={icon} error={formik.touched[name] && formik.errors[name]}>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      required={required}
      className={formik.touched[name] && formik.errors[name] ? 'error' : ''}
    />
  </FormGroup>
);

export const TextAreaInput = ({ label, name, icon, formik, placeholder, required = true }) => (
  <FormGroup label={label} icon={icon} error={formik.touched[name] && formik.errors[name]}>
    <textarea
      name={name}
      placeholder={placeholder}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      required={required}
      className={formik.touched[name] && formik.errors[name] ? 'error' : ''}
      rows={4}
    />
  </FormGroup>
);

export const NumberInput = ({ label, name, icon, formik, placeholder, required = true }) => (
  <FormGroup label={label} icon={icon} error={formik.touched[name] && formik.errors[name]}>
    <input
      type="number"
      name={name}
      placeholder={placeholder}
      step="0.01"
      min="0"
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      required={required}
      className={formik.touched[name] && formik.errors[name] ? 'error' : ''}
    />
  </FormGroup>
);

export const SelectInput = ({ label, name, icon, formik, options, required = true }) => (
  <FormGroup label={label} icon={icon} error={formik.touched[name] && formik.errors[name]}>
    <select
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      required={required}
      className={formik.touched[name] && formik.errors[name] ? 'error' : ''}
    >
      <option value="">Select {label}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </FormGroup>
);

export const DateInput = ({ label, name, icon, formik, required = true }) => (
  <FormGroup label={label} icon={icon} error={formik.touched[name] && formik.errors[name]}>
    <input
      type="date"
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      required={required}
      className={formik.touched[name] && formik.errors[name] ? 'error' : ''}
    />
  </FormGroup>
);

export const FileInput = ({ label, name, icon, formik, fileName, setFileName, required = true }) => (
  <FormGroup label={label} icon={icon} error={formik.touched[name] && formik.errors[name]}>
    <div className="file-input-wrapper">
      <input
        type="file"
        name={name}
        accept="image/*,application/pdf"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            formik.setFieldValue(name, file);
            setFileName(file.name);
          }
        }}
        onBlur={formik.handleBlur}
        id={`${name}-upload`}
      />
      <label
        htmlFor={`${name}-upload`}
        className={`file-input-label ${fileName ? 'file-selected' : ''} ${
          formik.touched[name] && formik.errors[name] ? 'error' : ''
        }`}
      >
        <Upload className="upload-icon" />
        {fileName || 'Choose file or drag here'}
      </label>
    </div>
  </FormGroup>
);