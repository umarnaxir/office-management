function DepartmentList() {
  const departments = [
    {
      name: "Engineering",
      employees: ["Umar", "Khalid", "Owais"]
    },
    {
      name: "Marketing",
      employees: ["Sameer", "Waseem", "Mohsin"]
    }
  ];

  return (
    <div>
      {departments.map((dept, deptIndex) => (
        <div key={deptIndex}>
          <h2>{dept.name}</h2>
          <ul>
            {dept.employees.map((emp, empIndex) => (
              <li key={empIndex}>{emp}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export default DepartmentList