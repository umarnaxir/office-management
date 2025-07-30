import React, { useState } from 'react';

const PayslipForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    // Company Details
    companyName: 'TechCorp Solutions Pvt Ltd',
    companyAddress: '123 Business Park, Tech City, TC 560001',
    companyPhone: '+91-80-12345678',
    companyEmail: 'hr@techcorp.com',
    companyPAN: 'ABCDE1234F',
    companyTAN: 'BANG12345D',
    companyWebsite: 'www.techcorp.com',
    
    // Employee Details
    employeeName: '',
    employeeId: '',
    designation: '',
    department: '',
    dateOfJoining: '',
    panNumber: '',
    aadhaarNumber: '',
    bankAccount: '',
    ifscCode: '',
    bankName: '',
    
    // Payslip Details
    payPeriod: '',
    payDate: '',
    workingDays: '30',
    paidDays: '30',
    leaveTaken: '0',
    
    // Salary Components - Earnings
    basicSalary: '',
    hra: '',
    transportAllowance: '',
    medicalAllowance: '',
    specialAllowance: '',
    bonus: '',
    overtime: '',
    incentive: '',
    
    // Deductions
    providentFund: '',
    esi: '',
    professionalTax: '',
    tds: '',
    loanDeduction: '',
    otherDeductions: '',
    lateDeduction: '',
    
    // Additional Information
    description: 'Monthly Salary Payment',
    remarks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotals = (data) => {
    const earnings = [
      parseFloat(data.basicSalary) || 0,
      parseFloat(data.hra) || 0,
      parseFloat(data.transportAllowance) || 0,
      parseFloat(data.medicalAllowance) || 0,
      parseFloat(data.specialAllowance) || 0,
      parseFloat(data.bonus) || 0,
      parseFloat(data.overtime) || 0,
      parseFloat(data.incentive) || 0
    ].reduce((sum, val) => sum + val, 0);
    
    const deductions = [
      parseFloat(data.providentFund) || 0,
      parseFloat(data.esi) || 0,
      parseFloat(data.professionalTax) || 0,
      parseFloat(data.tds) || 0,
      parseFloat(data.loanDeduction) || 0,
      parseFloat(data.otherDeductions) || 0,
      parseFloat(data.lateDeduction) || 0
    ].reduce((sum, val) => sum + val, 0);
    
    return {
      totalEarnings: earnings,
      totalDeductions: deductions,
      netSalary: earnings - deductions
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const totals = calculateTotals(formData);
    const payslipData = {
      ...formData,
      ...totals,
      generatedDate: new Date().toISOString().split('T')[0]
    };
    
    onSave(payslipData);
    
    // Reset only employee-specific fields
    setFormData(prev => ({
      ...prev,
      employeeName: '',
      employeeId: '',
      designation: '',
      department: '',
      dateOfJoining: '',
      panNumber: '',
      aadhaarNumber: '',
      bankAccount: '',
      ifscCode: '',
      bankName: '',
      payPeriod: '',
      payDate: '',
      workingDays: '30',
      paidDays: '30',
      leaveTaken: '0',
      basicSalary: '',
      hra: '',
      transportAllowance: '',
      medicalAllowance: '',
      specialAllowance: '',
      bonus: '',
      overtime: '',
      incentive: '',
      providentFund: '',
      esi: '',
      professionalTax: '',
      tds: '',
      loanDeduction: '',
      otherDeductions: '',
      lateDeduction: '',
      description: 'Monthly Salary Payment',
      remarks: ''
    }));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Generate Advanced Payslip</h2>

      <form onSubmit={handleSubmit} className="payslip-form">
        
        {/* Company Information */}
        <div className="form-section company-section">
          <h3 className="section-title">Company Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company PAN *</label>
              <input
                type="text"
                name="companyPAN"
                value={formData.companyPAN}
                onChange={handleChange}
                className="form-input"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                title="PAN format: ABCDE1234F"
                required
              />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Company Address *</label>
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="companyPhone"
                value={formData.companyPhone}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Employee Information */}
        <div className="form-section employee-section">
          <h3 className="section-title">Employee Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Employee Name *</label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Employee ID *</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Designation *</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">PAN Number *</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className="form-input"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                title="PAN format: ABCDE1234F"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date of Joining *</label>
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bank Account Number</label>
              <input
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className="form-input"
                pattern="[A-Z]{4}0[A-Z0-9]{6}"
                title="IFSC format: ABCD0123456"
              />
            </div>
          </div>
        </div>

        {/* Payslip Details */}
        <div className="form-section payslip-section">
          <h3 className="section-title">Payslip Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Pay Period *</label>
              <input
                type="month"
                name="payPeriod"
                value={formData.payPeriod}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Pay Date *</label>
              <input
                type="date"
                name="payDate"
                value={formData.payDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Working Days</label>
              <input
                type="number"
                name="workingDays"
                value={formData.workingDays}
                onChange={handleChange}
                className="form-input"
                min="1"
                max="31"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Paid Days</label>
              <input
                type="number"
                name="paidDays"
                value={formData.paidDays}
                onChange={handleChange}
                className="form-input"
                min="0"
                max="31"
              />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Monthly Salary Payment"
              />
            </div>
          </div>
        </div>

        {/* Salary Components - Earnings */}
        <div className="form-section earnings-section">
          <h3 className="section-title">Earnings</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Basic Salary *</label>
              <input
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">HRA</label>
              <input
                type="number"
                name="hra"
                value={formData.hra}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Transport Allowance</label>
              <input
                type="number"
                name="transportAllowance"
                value={formData.transportAllowance}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Medical Allowance</label>
              <input
                type="number"
                name="medicalAllowance"
                value={formData.medicalAllowance}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Special Allowance</label>
              <input
                type="number"
                name="specialAllowance"
                value={formData.specialAllowance}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bonus</label>
              <input
                type="number"
                name="bonus"
                value={formData.bonus}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Overtime</label>
              <input
                type="number"
                name="overtime"
                value={formData.overtime}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Incentive</label>
              <input
                type="number"
                name="incentive"
                value={formData.incentive}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Deductions */}
        <div className="form-section deductions-section">
          <h3 className="section-title">Deductions</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Provident Fund</label>
              <input
                type="number"
                name="providentFund"
                value={formData.providentFund}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">ESI</label>
              <input
                type="number"
                name="esi"
                value={formData.esi}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Professional Tax</label>
              <input
                type="number"
                name="professionalTax"
                value={formData.professionalTax}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">TDS</label>
              <input
                type="number"
                name="tds"
                value={formData.tds}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Loan Deduction</label>
              <input
                type="number"
                name="loanDeduction"
                value={formData.loanDeduction}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Other Deductions</label>
              <input
                type="number"
                name="otherDeductions"
                value={formData.otherDeductions}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-large">
            Generate Payslip
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayslipForm;