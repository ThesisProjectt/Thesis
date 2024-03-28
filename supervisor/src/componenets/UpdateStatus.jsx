import React, { useState } from 'react';
import profil from '../assets/profil-icon.png';

function UpdateStatus() {
  const [status, setStatus] = useState('Present'); // Default status is 'Present'

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Employee Name</th>
              <th className="px-4 py-2">Status</th> {/* Moved the Status label here */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">
                <div className="flex ml-4 mr-4 items-center">
                  <img src={profil} alt="Profile" className="h-8 mr-2" />
                  employee name
                </div>
              </td>
              <td className="border px-4 py-2"> {/* Adjusted styles for the second column */}
                <div className="relative">
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-10 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 11.293a1 1 0 011.414 0L10 12.586l1.293-1.293a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414zM10 4a1 1 0 100 2 1 1 0 000-2zm0 12a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UpdateStatus;
