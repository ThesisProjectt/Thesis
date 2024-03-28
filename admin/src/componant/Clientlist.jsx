import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from React Icons library

function Clientlist() {
  const [current, setcurrent] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const employeeData = [
    {
      name: "John Doe",
      role: "Manager",
      phoneNumber: "123-456-7890"
    },
    {
      name: "Jane Smith",
      role: "Developer",
      phoneNumber: "987-654-3210"
    },
  ];

  const number = 10;
  const end = current * number;
  const start = end - number;
  const currentItems = employeeData.slice(start, end);

  const paginate = (pageNumber) => setcurrent(pageNumber);
  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true);
  }

  return (
    <div>
      <div className="flex relative my-4 bg-white items-center rounded-lg p-5">
        <h1 className="text-lg font-medium">Customer List</h1>
      
      </div>
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
                {employee.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.phoneNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-500 mr-2">
                  <FaEdit  onClick={() => handleUpdateClick(employee)} /> 
                </button>
                <button className="text-red-500">
                  <FaTrash /> {/* Delete icon */}
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
    <div className="bg-white p-6 rounded-lg relative">
      <button
        onClick={() => setShowUpdateModal(false)}
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
      <h2 className="text-lg font-medium mb-4">Update Employee</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          defaultValue={selectedEmployee?.name}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          defaultValue={selectedEmployee?.role}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          defaultValue={selectedEmployee?.phoneNumber}
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Clientlist;
