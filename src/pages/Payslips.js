import React, { useState } from 'react';
import PayslipForm from '../components/Payslip/PayslipForm';
import PayslipList from '../components/Payslip/PayslipList';
import PayslipPreview from '../components/Payslip/PayslipPreview';

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const addPayslip = (payslip) => {
    setPayslips([...payslips, { ...payslip, id: Date.now() }]);
  };

  const deletePayslip = (id) => {
    setPayslips(payslips.filter(p => p.id !== id));
  };

  const viewPayslip = (payslip) => {
    setSelectedPayslip(payslip);
  };

  const closePayslipView = () => {
    setSelectedPayslip(null);
  };

  const printPayslip = () => {
    window.print();
  };

  const downloadPDF = () => {
    const printWindow = window.open('', '_blank');
    const payslipContent = document.getElementById('payslip-preview').innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payslip - ${selectedPayslip.employeeName}</title>
          <link rel="stylesheet" type="text/css" href="./payslip.css">
          <style>
            @media print {
              .no-print { display: none !important; }
              .payslip-document { 
                border: none; 
                box-shadow: none; 
                margin: 0;
                max-width: none;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          ${payslipContent}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="payslip-app">
      <div className="app-container">
        <h1 className="app-title">Generate Employees Payslip</h1>

        {!selectedPayslip ? (
          <div className="main-content">
            <PayslipForm onSave={addPayslip} />
            <PayslipList 
              payslips={payslips} 
              onDelete={deletePayslip} 
              onView={viewPayslip} 
            />
          </div>
        ) : (
          <div className="preview-container">
            <div className="preview-actions no-print">
              <button
                onClick={closePayslipView}
                className="btn btn-secondary"
              >
                ← Back to List
              </button>
              <button
                onClick={printPayslip}
                className="btn btn-primary"
              >
                🖨️ Print Payslip
              </button>
              <button
                onClick={downloadPDF}
                className="btn btn-success"
              >
                📄 Download PDF
              </button>
            </div>
            
            <PayslipPreview payslip={selectedPayslip} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Payslips;