import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import icons from React Icons library

function Clientlist() {
  const [current, setcurrent] = useState(1);
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = await axios.get(
          "http://localhost:3000/client/getclient"
        );
        setEmployeeData(client.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const number = 10;
  const end = current * number;
  const start = end - number;
  console.log(employeeData.slice(start, end));
  const currentItems = employeeData.slice(start, end);

  const paginate = (pageNumber) => setcurrent(pageNumber);

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
              Full Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
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
              <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
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
    </div>
  );
}

export default Clientlist;
