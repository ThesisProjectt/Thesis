import React, { useState } from 'react';

function Createteam() {
  const [selectedSupervisor, setSelectedSupervisor] = useState(""); // State to store selected supervisor
  const [selectedEmployee, setSelectedEmployee] = useState(""); // State to store selected employee

  // Sample supervisor and employee data
  const supervisorData = [
    "Supervisor 1",
    "Supervisor 2",
    "Supervisor 3",
    // Add more supervisor options here...
  ];

  const employeeData = [
    "Employee 1",
    "Employee 2",
    "Employee 3",
    // Add more employee options here...
  ];

  const handleSupervisorChange = (e) => {
    setSelectedSupervisor(e.target.value);
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  return (
    <div>
      <div className="flex  my-4 bg-white items-center rounded-lg p-5">
        <h1 className="text-lg font-medium">Employee List</h1>
      </div>

      {/* Supervisor Selection */}
      <div className="flex my-4 bg-white items-center rounded-lg p-5">
        <h1 className="text-lg font-medium">Supervisor:</h1>
        <select
          value={selectedSupervisor}
          onChange={handleSupervisorChange}
          className="ml-2 border border-gray-300 rounded-md p-2 focus:outline-none"
        >
          <option value="">Select Supervisor</option>
          {supervisorData.map((supervisor, index) => (
            <option key={index} value={supervisor}>
              {supervisor}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Selection */}
      <div className="flex my-4 bg-white items-center rounded-lg p-5">
        <h1 className="text-lg font-medium">Employee:</h1>
        <select
          value={selectedEmployee}
          onChange={handleEmployeeChange}
          className="ml-2 border border-gray-300 rounded-md p-2 focus:outline-none"
        >
          <option value="">Select Employee</option>
          {employeeData.map((employee, index) => (
            <option key={index} value={employee}>
              {employee}
            </option>
          ))}
        </select>
      </div>
      
      {/* Rest of your component */}
    </div>
  );
}

export default Createteam;
