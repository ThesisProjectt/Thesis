import React, { useState } from "react";

const AllRequests = () => {
  const [current, setcurrent] = useState(1);

  const requestData = [
    {
      customerName: "John Doe",
      dueDate: "2024-03-25",
      status: "Pending",
      completion: "30%",
    },
    {
      customerName: "Jane Smith",
      dueDate: "2024-03-26",
      status: "Completed",
      completion: "100%",
    },
    {
      customerName: "Alice Johnson",
      dueDate: "2024-03-27",
      status: "Pending",
      completion: "50%",
    },
    {
      customerName: "Bob Brown",
      dueDate: "2024-03-28",
      status: "Completed",
      completion: "80%",
    },
    {
      customerName: "Emily Davis",
      dueDate: "2024-03-29",
      status: "Pending",
      completion: "20%",
    },
    {
      customerName: "Michael Wilson",
      dueDate: "2024-03-30",
      status: "Completed",
      completion: "95%",
    },
    {
      customerName: "Sarah Taylor",
      dueDate: "2024-03-31",
      status: "Pending",
      completion: "40%",
    },
    {
      customerName: "David Martinez",
      dueDate: "2024-04-01",
      status: "Completed",
      completion: "70%",
    },
    {
      customerName: "Karen Clark",
      dueDate: "2024-04-02",
      status: "Pending",
      completion: "60%",
    },
    {
      customerName: "Christopher Lee",
      dueDate: "2024-04-03",
      status: "Completed",
      completion: "90%",
    },
  ];

  const number = 6;
  const end = current * number;
  const start = end - number;
  const currentItems = requestData.slice(start, end);

  const paginate = (pageNumber) => setcurrent(pageNumber);

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Customer Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Due Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Completion
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((request, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {request.customerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{request.dueDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {request.status === "Completed" ? (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 mr-2 rounded-full"></div>
                    {request.status}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 mr-2 rounded-full"></div>
                    {request.status}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`flex items-center`}>
                  <div
                    className={`h-2 rounded-full ${
                      request.status === "Completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    } mr-2`}
                    style={{ width: request.completion }}
                  ></div>
                  <span>{request.completion}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(requestData.length / number) },
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
};

export default AllRequests;
