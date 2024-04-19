import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa"; // Import the Plus icon from react-icons/fa

function Createteam(props) {
  const [selectedSupervisor, setSelectedSupervisor] = useState(0);
  const [selectedEmployees, setSelectedEmployees] = useState([null]);
  const [teamName, setTeamName] = useState("");
  const [supervisorData, setSupervisorData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        let response = await axios.get(
          "http://localhost:3000/supervisor/supernotteam"
        );
        let response1 = await axios.get(
          "http://localhost:3000/employee/getemployeefree"
        );
        setEmployeeData(response1.data);
        setSupervisorData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const createteam = async () => {
    try {
      const obj = {
        supervisor_id: selectedSupervisor,
        name: teamName,
      };
      const team = await axios.post("http://localhost:3000/team/postteam", obj);
      selectedEmployees.forEach(async (employee) => {
        if (employee) {
          const x = {
            id: employee.id,
            fullName: employee.fullName,
            team_id: team.data.id,
          };
          const updateemployee = await axios.put(
            `http://localhost:3000/employee/updateemployeeteam/${employee.id}`,
            x
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const supervisorChange = (e) => {
    setSelectedSupervisor(e.target.value);
  };

  const employeeChange = (e, index) => {
    const employeeId = e.target.value;
    const employee = employeeData.find(
      (emp) => emp.id === parseInt(employeeId)
    );
    const updatedEmployees = [...selectedEmployees];
    updatedEmployees[index] = employee;
    setSelectedEmployees(updatedEmployees);
  };

  const changeName = (e) => {
    setTeamName(e.target.value);
  };

  const addEmployeeDropdown = () => {
    setSelectedEmployees([...selectedEmployees, null]);
  };

  return (
    <div>
      <div className="flex my-4 bg-white items-center rounded-lg p-5">
        <h1 className="text-lg font-medium">Employee List</h1>
      </div>

      <div className="flex my-4 bg-white items-center rounded-lg p-5">
        <h1 className="text-lg font-medium">Supervisor:</h1>
        <select
          value={selectedSupervisor}
          onChange={supervisorChange}
          className="ml-2 border border-gray-300 rounded-md p-2 focus:outline-none"
        >
          <option value="">Select Supervisor</option>
          {supervisorData.map((supervisor, index) => (
            <option key={index} value={supervisor.id}>
              {supervisor.fullName}
            </option>
          ))}
        </select>
      </div>

      {selectedEmployees.map((employee, index) => (
        <div
          key={index}
          className="flex my-4 bg-white items-center rounded-lg p-5"
        >
          <h1 className="text-lg font-medium">Employee:</h1>
          <select
            value={employee ? employee.id : ""}
            onChange={(e) => employeeChange(e, index)}
            className="ml-2 border border-gray-300 rounded-md p-2 focus:outline-none"
          >
            <option value="">Select Employee</option>
            {employeeData.map((emp, i) => (
              <option key={i} value={emp.id}>
                {emp.fullName}
              </option>
            ))}
          </select>
          {index === selectedEmployees.length - 1 && (
            <div className="flex justify-end items-end gap-x-6 my-4 rounded-lg p-5">
              <button className="ml-2" onClick={addEmployeeDropdown}>
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="flex my-4 bg-white items-center rounded-lg p-5">
        <h1 className="text-lg font-medium">Team Name:</h1>
        <input
          type="text"
          value={teamName}
          onChange={changeName}
          className="ml-2 border border-gray-300 rounded-md p-2 focus:outline-none"
          placeholder="Enter Team Name"
        />
      </div>

      <div className="flex justify-end items-end gap-x-6 my-4 rounded-lg p-5">
        <button
          className="p-2 w-32 text-white text-center bg-red-500 rounded-xl"
          onClick={() => {
            props.change("home");
          }}
        >
          Cancel
        </button>
        <button
          className="p-2 w-32 text-white text-center bg-green-600 rounded-xl"
          onClick={() => {
            createteam();
            props.change("home");
            props.changeref()
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Createteam;
