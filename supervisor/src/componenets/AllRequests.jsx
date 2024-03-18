import React, { useState } from 'react';
import profil from '../assets/profil-icon.png';
import trash from '../assets/trash.png';

function AllRequests(props) {
  const [status, setStatus] = useState('Completed');
  return (
    <div className='justify-between items-center'>
      <div className="bg-white rounded-md p-4 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Customer Name</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Progress</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border  px-4 py-2">
                      <div className="flex ml-4 mr-4 items-center">
                        <img src={profil} alt="Profile" className="h-8 mr-2" />
                        Customer A
                      </div>
                    </td>
                    <td className="border  px-4 py-2"><div className='ml-6 mr-6'>2024-03-15</div></td>
                    <td className="border  px-4 py-2">
                      {status === 'Completed' ? (
                        <div className="flex ml-4 mr-4 items-center">
                          <div className="w-2 h-2 ml-4 mr-4 rounded-full bg-green-500 "></div>
                          Completed
                        </div>
                      ) : (
                        <div className="flex ml-6 mr-6 items-center">
                          <div className="w-2 h-2 ml-6  mr-6 rounded-full bg-orange-500 "></div>
                          In Progress
                        </div>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex ml-6 mr-6 items-center">
                        <div className={`w-16 bg-gray-200 h-1 mr-2 relative ${status === 'Completed' ? 'bg-green-500' : 'bg-orange-500'}`}>
                          <div className="absolute top-0 left-0 h-full" style={{ width: '50%', backgroundColor: status === 'Completed' ? '#34D399' : '#FBBF24' }}></div>
                        </div>
                        50%
                      </div>
                    </td>
                    <td className="border px-4 py-2 flex items-center">
                      <div className="bg-white ml-6 mr-6 rounded-md shadow p-1.5 m-1">
                        <button className="text-blue-500 hover:text-blue-700 font-bold w-20 text-sm">View</button>
                      </div>
                      <div className="bg-white w-10 rounded-md shadow p-1.5">
                        <img src={trash} alt="Delete" className="h-6  cursor-pointer  " />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
    </div>
  )
}

export default AllRequests
