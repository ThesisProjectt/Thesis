import React, { useState } from 'react'
import profil from '../assets/profil-icon.png';
import trash from '../assets/trash.png';


function AllClients(props) {
    
    return (
      <div className='justify-between items-center'>
        <div className="bg-white rounded-md p-4 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Customer Name</th>
                      <th className="px-4 py-2">Phone Number</th>
                      <th className="px-4 py-2">E-mail</th>
                      <th className="px-4 py-2"></th>
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
                      <td className="border  px-4 py-2"><div className='ml-6 mr-6'>123-123-1234</div></td>
                      <td className="border  px-4 py-2">
                      <div className="flex ml-4 mr-4 items-center">
                            Customer@gmail.com
                          </div>
                      </td>
                      
                      <td className="border px-4 py-2 flex items-center">
                        <div className="bg-white ml-6 mr-6 rounded-md shadow p-1.5 m-1">
                          <button className="text-blue-500 hover:text-blue-700 font-bold w-30 text-sm">View all requests</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
      </div>
    )
  }

export default AllClients
