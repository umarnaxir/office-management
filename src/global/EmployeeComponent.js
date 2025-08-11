"use client";
import { addEmployee,  } from "../services/employeeService";
import {useEmployees}from "../hooks/Employees/useEmployees"

export default function EmployeeComponent() {
  const {employees, loading}=useEmployees()

  const handleAdd = async () => {
    await addEmployee({ Name: "Umar", ROLE: "Developer", DOB: "2025-08-06" });
  };

  if(loading){
    return <div>Loading Employees...</div>
  }

  return (
    <div className="p-6">
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Employee
      </button>

      <ul className="mt-4">
        {JSON.stringify(employees)}
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
