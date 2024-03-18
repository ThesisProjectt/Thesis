import React, { useState } from 'react';
import profil from '../assets/profil-icon.png';
import update from '../assets/update.png'


function MyTeam(props) {
    const [status, setStatus] = useState('Completed');
    return (
      <div className='justify-between items-center'>
        <div className="bg-white rounded-md p-4 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Employee Name</th>
                      <th className="px-4 py-2">Phone Number</th>
                      <th className="px-4 py-2">Role</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border  px-4 py-2">
                        <div className="flex ml-4 mr-4 items-center">
                          <img src={profil} alt="Profile" className="h-8 mr-2" />
                          employee name
                        </div>
                      </td>
                      <td className="border  px-4 py-2"><div className='ml-6 mr-6'>123-123-1234</div></td>
                      <td className="border  px-4 py-2"><div className='ml-6 mr-6'>Supervisor</div></td>
                      <td className="border  px-4 py-2">
                      {status === 'Completed' ? (
                        <div className="flex ml-4 mr-4 items-center">
                          <div className="w-2 h-2 ml-4 mr-4 rounded-full bg-green-500 "></div>
                          Available
                        </div>
                      ) : (
                        <div className="flex ml-6 mr-6 items-center">
                          <div className="w-2 h-2 ml-6  mr-6 rounded-full bg-orange-500 "></div>
                          Absent
                        </div>
                      )}
                    </td>
                      <td className="border px-4 py-2 flex items-center">
                      <div className="bg-white w-10 rounded-md shadow p-1.5" onClick={() => {props.changeView('UpdateStatus')}}>
                        <img src={ update} alt="Delete" className="h-6  cursor-pointer  " />
                      </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
      </div>
    )
  }


export default MyTeam
