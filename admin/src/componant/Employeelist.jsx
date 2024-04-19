import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

function Employeelist(props) {
  const [current, setcurrent] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddSupervisorModal, setShowAddSupervisorModal] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [refresh,setRefresh]=useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await axios.get(
          "http://localhost:3000/employee/getemployee"
        );
        const supervisorResponse = await axios.get(
          "http://localhost:3000/supervisor/getall"
        );
        const employeesWithRole = employeeResponse.data.map((employee) => ({
          ...employee,
          role: "employee",
        }));

        const supervisorsWithRole = supervisorResponse.data.map(
          (supervisor) => ({
            ...supervisor,
            role: "supervisor",
          })
        );

        const data = [...employeesWithRole, ...supervisorsWithRole];
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }
        setEmployeeData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [!refresh]);

  const number = 10;
  const end = current * number;
  const start = end - number;
  const currentItems = employeeData.slice(start, end);

  const paginate = (pageNumber) => setcurrent(pageNumber);
  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true);
  };

  const addSupervisor = async () => {
    try {
      await axios.post("http://localhost:3000/supervisor/create", {
        fullName: name,
        email: email,
        password: password,
      });
      setShowAddSupervisorModal(false);
      fetchData();
    } catch (error) {
      console.error("Error adding supervisor:", error);
    }
  };

  const addEmployee = async () => {
    try {
      await axios.post("http://localhost:3000/employee/postemployee", {
        fullName: name,
      });
      setShowAddEmployeeModal(false);
      fetchData();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleAddClick = (type) => {
    if (type === "employee") {
      setShowAddEmployeeModal(true);
    } else if (type === "supervisor") {
      setShowAddSupervisorModal(true);
    }
  };

  return (
    <div>
      <div className="flex relative my-4 bg-white items-center rounded-lg p-5">
        <h1 className="text-lg font-medium">Employee List</h1>
        <div className="absolute flex gap-x-3 right-4">
          <button
            onClick={() => handleAddClick("supervisor")}
            className="bg-teal-500 w-full text-white px-6 py-2 rounded-md hover:bg-teal-700"
          >
            Add Supervisor
          </button>
          <button
            onClick={() => handleAddClick("employee")}
            className="bg-teal-500 w-full text-white px-6 py-2 rounded-md hover:bg-teal-700"
          >
            Add Employee
          </button>
        </div>
      </div>
      {/* Employee Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Phone Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((employee, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.fullName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.role === "employee"
                  ? "(+216 xx xxx xxx)"
                  : employee.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-500 mr-2">
                  <FaEdit onClick={() => handleUpdateClick(employee)} />
                </button>
                <button className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(employeeData.length / number) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className="mx-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      
      {showUpdateModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          {/* Update Employee Form */}
        </div>
      )}
      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg relative">
            <button
              onClick={() => setShowAddEmployeeModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-medium mb-4">Add Employee</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={()=>{addEmployee(),setRefresh(!refresh),props.change('home')}}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showAddSupervisorModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg relative">
            <button
              onClick={() => setShowAddSupervisorModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-medium mb-4">Add Employee</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={()=>{addSupervisor(),setRefresh(!refresh),props.change('home')}}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employeelist;
