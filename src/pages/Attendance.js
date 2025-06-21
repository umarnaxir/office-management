import React, { useState } from 'react';
import AttendanceTable from '../components/AttendanceTable';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  const markAttendance = (employeeName, status) => {
    setAttendanceData(prev => [
      ...prev,
      {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        employeeName,
        status
      }
    ]);
  };

  const deleteAttendance = (id) => {
    setAttendanceData(attendanceData.filter(record => record.id !== id));
  };

  return (
    <div className="page-attendance">
      <h1>Attendance Management</h1>

      <button onClick={() => markAttendance('John Doe', 'Present')}>Mark Present (John Doe)</button>
      <button onClick={() => markAttendance('Jane Smith', 'Absent')}>Mark Absent (Jane Smith)</button>

      <AttendanceTable
        records={attendanceData}
        onDelete={deleteAttendance}
      />
    </div>
  );
};

export default Attendance;
