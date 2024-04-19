import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

function RequestList() {
  const [requests, setRequests] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [teamsWithoutMission, setTeamsWithoutMission] = useState([]);
  const [date, setDate] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [not,setNot]=useState({})
  useEffect(() => {
    const teams = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/team/teamwithoutteam",
          { d: date }
        );
        setTeamsWithoutMission(response.data);
      } catch (error) {
        console.error("Error fetching teams without mission:", error);
      }
    };

    teams();
    const fetchData = async () => {
      try {
        const requestResponse = await axios.get(
          "http://localhost:3000/request/getonlyrequest"
        );
        setRequests(requestResponse.data);
console.log(requestResponse.data);
        const clientPromises = requestResponse.data.map(async (request) => {
          const clientResponse = await axios.get(
            `http://localhost:3000/client/profile/${request.client_id}`
          );
          return clientResponse.data;
        });

        const clientData = await Promise.all(clientPromises);
        setClients(clientData);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData();
  }, [!refresh]);

  const changenot=(c,p)=>{
    setNot({c:c,p:p})
  }
  const accept = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const deleted = async (requestId,c,p) => {
    await axios
      .delete(`http://localhost:3000/request/deletreq/${requestId}`)
      .then(() => {
        console.log(requestId,"deleted");
      })
      .catch((err) => console.log(err));
      const obj={
        status:"denied",
        client_id:c,
        pack_id:p,
        message:"your request  is denied by admin"
      }
      await axios.post("http://localhost:3000/notification/postnotification",obj).then(() => {
        console.log("posted");
      })
      .catch((err) => console.log(err));
      setRefresh(!refresh)
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleConfirmMission = async () => {
    const data = {
      status: "pending",
      team_id: selectedTeamMember,
      request_id: selectedRequest.id,
    };
    axios
      .post("http://localhost:3000/mission/createmission", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
      const obj={
        status:"accepted",
        client_id:not.c,
        pack_id:not.p,
        message:"your request  is accepted by admin"
      }
      await axios.post("http://localhost:3000/notification/postnotification",obj).then(() => {
        console.log("posted");
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex relative my-4 bg-white items-center rounded-lg p-5">
        <h1 className="text-lg font-medium">Request List</h1>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Client Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date Requested
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
          {requests.map((request, index) => (
            <tr key={request.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={
                    clients[index]?.image === null
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjjxa2pmMOQWlfnXSGEUd8QqYGw2BLqV7BvrECDaTucA&s"
                      : clients[index]?.image
                  }
                  alt="Client"
                  className="h-12 w-12"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {clients[index]?.fullName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{request.start}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-green-500 mr-2"
                  onClick={() => {
                    accept(request), setDate(request.start);changenot(clients[index]?.id,request.pack_id)
                  }}
                >
                  <FaCheck />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => deleted(request.id,clients[index]?.id,request.pack_id)}
                >
                  <FaTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="z-10 bg-white p-6 rounded-lg relative w-96">
            <button
              onClick={closeModal}
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
            <h2 className="text-lg font-medium mb-4">Create Mission</h2>
            <div className="mb-4">
              <select
                onChange={(e) => setSelectedTeamMember(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select a Team</option>
                {teamsWithoutMission.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleConfirmMission}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestList;
