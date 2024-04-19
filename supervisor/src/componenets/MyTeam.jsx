import React, { useState,useEffect } from 'react';
import profil from '../assets/profil-icon.png';
import update from '../assets/update.png'
import NavBar from './NavBar';
import SideBar from './SideBar';
import MissionSide from './MissionSide';
import axios from 'axios'
import backgroundImage from "../assets/background2.png";


function MyTeam(props) {
    const [status, setStatus] = useState('Completed');
    const [data,setData] = useState([])


  useEffect(() => {
    axios.get("http://localhost:3000/team/getteam/1")
      .then((res) => {
        console.log("your data is here");
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


    return (
      <div className="bg-teal-100 min-h-screen flex flex-grow justify-between items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="container  mx-auto px-2 py-8 w-full flex-1">
    <NavBar changeView={props.changeView}/>
      <div className="flex space-x-4 mt-7">
      <SideBar changeView={props.changeView}/>
      <div class="bg-white p-8 rounded-md w-full">
	
      <div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="w-full">
                   <thead>
                     <tr>
                       <th className="px-4 py-2">Employee Name</th>
                       <th className="px-4 py-2">Status</th>
                       <th className="px-4 py-2"></th>
                     </tr>
                   </thead>
                  { data.map((e,i)=>{
                   return (
                    e.Employees.map((el,i)=>{
                      return (
                        <tbody>
<tr>
  <td className="border  px-4 py-2">
    <div className="flex ml-4 mr-4 items-center">
      <img src={profil} alt="Profile" className="h-8 mr-2" />
      {console.log('your employee',el.fullName)}
      <p>{el.fullName}</p>
    </div>
  </td>
  
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
                      )
                      
                    })
                   )

                   })}
                 </table>
            <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between ">
              <div class="inline-flex mt-2 xs:mt-0">
                <button lass="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">Prev</button>
                &nbsp; &nbsp;
                <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MissionSide changeView={props.changeView} data={props.data}/>
        </div>
      </div>
    </div>
    )
  }


export default MyTeam



// import React, { useState } from 'react';
// import profil from '../assets/profil-icon.png';
// import update from '../assets/update.png'


// function MyTeam(props) {
//     const [status, setStatus] = useState('Completed');
//     return (
//       <div className='justify-between items-center'>
//         <div className="bg-white rounded-md p-4 mb-4">
//                 <table className="w-full">
//                   <thead>
//                     <tr>
//                       <th className="px-4 py-2">Employee Name</th>
//                       <th className="px-4 py-2">Phone Number</th>
//                       <th className="px-4 py-2">Role</th>
//                       <th className="px-4 py-2">Status</th>
//                       <th className="px-4 py-2"></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td className="border  px-4 py-2">
//                         <div className="flex ml-4 mr-4 items-center">
//                           <img src={profil} alt="Profile" className="h-8 mr-2" />
//                           employee name
//                         </div>
//                       </td>
//                       <td className="border  px-4 py-2"><div className='ml-6 mr-6'>123-123-1234</div></td>
//                       <td className="border  px-4 py-2"><div className='ml-6 mr-6'>Supervisor</div></td>
//                       <td className="border  px-4 py-2">
//                       {status === 'Completed' ? (
//                         <div className="flex ml-4 mr-4 items-center">
//                           <div className="w-2 h-2 ml-4 mr-4 rounded-full bg-green-500 "></div>
//                           Available
//                         </div>
//                       ) : (
//                         <div className="flex ml-6 mr-6 items-center">
//                           <div className="w-2 h-2 ml-6  mr-6 rounded-full bg-orange-500 "></div>
//                           Absent
//                         </div>
//                       )}
//                     </td>
//                       <td className="border px-4 py-2 flex items-center">
//                       <div className="bg-white w-10 rounded-md shadow p-1.5" onClick={() => {props.changeView('UpdateStatus')}}>
//                         <img src={ update} alt="Delete" className="h-6  cursor-pointer  " />
//                       </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//       </div>
//     )
//   }


// export default MyTeam

