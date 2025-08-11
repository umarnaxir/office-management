import React, { useState } from 'react';
import { ArrowLeft, Plus, User, FileText, DollarSign, Activity, Calendar, Upload } from 'lucide-react';
import { useCreateReimburse } from '../../hooks/Reimbusement/useCreateReimburse';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  TextInput,
  TextAreaInput,
  NumberInput,
  SelectInput,
  DateInput,
  FileInput
} from './FormInputs';

const ReimbursementForm = ({ setCurrentView }) => {
  const [fileName, setFileName] = useState('');
  const { createReimbursement, loading, error } = useCreateReimburse();

  const categoryOptions = [
    { value: 'food', label: 'Food & Dining' },
    { value: 'travel', label: 'Travel & Transport' },
    { value: 'supplies', label: 'Office Supplies' },
    { value: 'tools', label: 'Tools & Equipment' },
    { value: 'other', label: 'Other' }
  ];

  const validationSchema = Yup.object().shape({
    employeeName: Yup.string().required('Employee name is required'),
    description: Yup.string().required('Description is required'),
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be positive')
      .typeError('Amount must be a number'),
    category: Yup.string().required('Category is required'),
    date: Yup.date()
      .required('Date is required')
      .typeError('Please enter a valid date'),
    receiptFile: Yup.mixed()
      .required('Receipt is required')
      .test('fileSize', 'File too large', value => value && value.size <= 5000000)
      .test('fileType', 'Unsupported file type', value => 
        value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)
      )
  });

  const handleSubmit = async (values) => {
    try {
      const submissionData = {
        employeeName: values.employeeName.trim(),
        description: values.description.trim(),
        amount: parseFloat(values.amount),
        category: values.category,
        date: values.date,
        status: 'pending',
        receiptFile: {
          name: values.receiptFile?.name || '',
          size: values.receiptFile?.size || 0,
          type: values.receiptFile?.type || ''
        }
      };
      
      await createReimbursement(submissionData);
      alert('Reimbursement submitted successfully!');
      setFileName('');
      setCurrentView('list');
    } catch (err) {
      alert('Failed to submit reimbursement: ' + err.message);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="form-container">
      <div className="page-header">
        <button className="back-button" onClick={() => setCurrentView('home')}>
          <ArrowLeft />
          Back to Home
        </button>
        <h1>Submit Reimbursement Request</h1>
      </div>

      <Formik
        initialValues={{
          employeeName: '',
          description: '',
          amount: '',
          category: '',
          date: today,
          receiptFile: null
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {formik => (
          <Form>
            <div className="form-grid">
              <TextInput
                label="Employee Name"
                name="employeeName"
                icon={User}
                formik={formik}
                placeholder="Enter your full name"
              />

              <TextAreaInput
                label="Description"
                name="description"
                icon={FileText}
                formik={formik}
                placeholder="Describe the expense..."
              />

              <NumberInput
                label="Amount (₹)"
                name="amount"
                icon={DollarSign}
                formik={formik}
                placeholder="0.00"
              />

              <SelectInput
                label="Category"
                name="category"
                icon={Activity}
                formik={formik}
                options={categoryOptions}
              />

              <DateInput
                label="Date"
                name="date"
                icon={Calendar}
                formik={formik}
              />

              <FileInput
                label="Upload Receipt"
                name="receiptFile"
                icon={Upload}
                formik={formik}
                fileName={fileName}
                setFileName={setFileName}
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setCurrentView('home')}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn-primary" 
                disabled={!formik.isValid || loading}
                onClick={() => {
                  if (formik.isValid) {
                    handleSubmit(formik.values);
                  }
                }}
              >
                {loading ? 'Submitting...' : (
                  <>
                    <Plus className="btn-icon" />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReimbursementForm;