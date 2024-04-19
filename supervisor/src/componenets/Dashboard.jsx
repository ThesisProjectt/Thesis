import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import SideBar from './SideBar';
import MissionSide from './MissionSide';
import backgroundImage from "../assets/background2.png";

function Dashboard(props) {
  const [status, setStatus] = useState('Completed');
  const [data, setData] = useState([]);
  const [requests,setRequests] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/client/getclient")
      .then((res) => {
        console.log("your data is here");
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 useEffect(()=>{
    axios.get("http://localhost:3000/supervisor/getsupermission/1").then((res) => {
      console.log("your req is here");
      setRequests(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  return (
    <div className=" min-h-screen flex flex-grow justify-between items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto px-2 py-8 w-full flex-1">
        <NavBar changeView={props.changeView}/>
        <div className="flex space-x-4 mt-7">
          <SideBar changeView={props.changeView}/>
          <div className="bg-white p-8 rounded-md w-full">
            <div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Customer Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Progress
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                   {
                    data.map((e)=>(
                      <tbody>
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img className="w-full h-full rounded-full" src={e.image} alt="" />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">{e.fullName}</p>
                            </div>
                          </div>
                        </td>
                        
                       {
                        requests.map((el)=>(
                          <>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{el.start}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {/* {status === 'Completed' ? (
                            <div className="flex items-center">
                              <div className="w-2 h-2 ml-4 mr-4 rounded-full bg-green-500 "></div>
                              Completed {console.log('hh',el.Team.Missions[0].status)}
                            </div>
                          ) : (
                            <div className="flex ml-6 mr-6 items-center">
                              <div className="w-2 h-2 ml-6  mr-6 rounded-full bg-orange-500 "></div>
                              In Progress
                            </div>
                          )} */}
                          {el.Team.Missions[0].status}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {/* <div className="flex items-center">
                            <div className={`w-16 bg-gray-200 h-1 mr-2 relative ${status === 'Completed' ? 'bg-green-500' : 'bg-orange-500'}`}>
                              <div className="absolute top-0 left-0 h-full" style={{ width: '20%', backgroundColor: status === 'Completed' ? '#34D399' : '#FBBF24' }}></div>
                            </div>
                            20%
                          </div> */}  
                         <p> <meter  max="100" value={el.Team.Missions[0].progress}></meter>
                           {el.Team.Missions[0].progress}% </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="bg-white ml-6 mr-6 rounded-md shadow p-1.5 m-1">
                            <button onClick={() => props.changeView("DailyRequestDetails")} className="text-blue-500 hover:text-blue-700 font-bold w-20 text-sm">View</button>
                          </div>
                        </td>
                          </>
                        ))
                       } 
                       
                      </tr>
                    </tbody>
                    ))
                   } 
                  </table>
                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between ">
                    <div className="inline-flex mt-2 xs:mt-0">
                      <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">Prev</button>
                      &nbsp; &nbsp;
                      <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">Next</button>
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
  );
}

export default Dashboard;
