import React, { useState, useEffect } from 'react';
import AttendanceTable from '../components/Attendance/AttendanceTable';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [status, setStatus] = useState('Present');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Dummy employee list for dropdown
  const employees = [
    { id: 'E001', name: 'John Doe' },
    { id: 'E002', name: 'Jane Smith' },
    { id: 'E003', name: 'Alice Johnson' },
    { id: 'E004', name: 'Bob Brown' },
    { id: 'E005', name: 'Carol White' },
    { id: 'E006', name: 'David Lee' },
    { id: 'E007', name: 'Emma Davis' },
    { id: 'E008', name: 'Frank Wilson' },
    { id: 'E009', name: 'Grace Taylor' },
    { id: 'E010', name: 'Henry Clark' },
  ];

  useEffect(() => {
    // Initialize with 10 dummy attendance records
    const dummyData = [
      { id: Date.now() + 1, employeeId: 'E001', employeeName: 'John Doe', status: 'Present', date: '2025-07-28' },
      { id: Date.now() + 2, employeeId: 'E002', employeeName: 'Jane Smith', status: 'Absent', date: '2025-07-28' },
      { id: Date.now() + 3, employeeId: 'E003', employeeName: 'Alice Johnson', status: 'Half Day', date: '2025-07-27' },
      { id: Date.now() + 4, employeeId: 'E004', employeeName: 'Bob Brown', status: 'Leave', date: '2025-07-27' },
      { id: Date.now() + 5, employeeId: 'E005', employeeName: 'Carol White', status: 'Present', date: '2025-07-26' },
      { id: Date.now() + 6, employeeId: 'E006', employeeName: 'David Lee', status: 'Absent', date: '2025-07-26' },
      { id: Date.now() + 7, employeeId: 'E007', employeeName: 'Emma Davis', status: 'Half Day', date: '2025-07-25' },
      { id: Date.now() + 8, employeeId: 'E008', employeeName: 'Frank Wilson', status: 'Leave', date: '2025-07-25' },
      { id: Date.now() + 9, employeeId: 'E009', employeeName: 'Grace Taylor', status: 'Present', date: '2025-07-24' },
      { id: Date.now() + 10, employeeId: 'E010', employeeName: 'Henry Clark', status: 'Absent', date: '2025-07-24' },
    ];
    setAttendanceData(dummyData);
  }, []);

  const markAttendance = (e) => {
    e.preventDefault();
    if (!employeeId || !employeeName) return;
    setAttendanceData(prev => [
      ...prev,
      {
        id: Date.now(),
        employeeId,
        employeeName,
        status,
        date,
      },
    ]);
    // Reset form
    setEmployeeId('');
    setEmployeeName('');
    setStatus('Present');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const deleteAttendance = (id) => {
    setAttendanceData(attendanceData.filter(record => record.id !== id));
  };

  // Update employeeName when employeeId changes
  const handleEmployeeChange = (e) => {
    const selectedId = e.target.value;
    const selectedEmployee = employees.find(emp => emp.id === selectedId);
    setEmployeeId(selectedId);
    setEmployeeName(selectedEmployee ? selectedEmployee.name : '');
  };

  return (
    <div className="attmgmt-container">
      <h1 className="attmgmt-page-title">Attendance Management</h1>

      {/* Attendance Form */}
      <div className="attmgmt-form-container">
        <h2 className="attmgmt-form-title">Mark Attendance</h2>
        <div className="attmgmt-form">
          <div className="attmgmt-form-group">
            <label className="attmgmt-form-label">Employee:</label>
            <select
              className="attmgmt-form-select"
              value={employeeId}
              onChange={handleEmployeeChange}
              required
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.id} - {emp.name}</option>
              ))}
            </select>
          </div>
          <div className="attmgmt-form-group">
            <label className="attmgmt-form-label">Status:</label>
            <select
              className="attmgmt-form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Half Day">Half Day</option>
              <option value="Leave">Leave</option>
            </select>
          </div>
          <div className="attmgmt-form-group">
            <label className="attmgmt-form-label">Date:</label>
            <input
              type="date"
              className="attmgmt-form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="attmgmt-form-actions">
            <button className="attmgmt-submit-button" onClick={markAttendance}>Mark Attendance</button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <AttendanceTable
        records={attendanceData}
        onDelete={deleteAttendance}
      />
    </div>
  );
};

export default Attendance;