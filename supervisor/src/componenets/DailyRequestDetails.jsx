import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import SideBar from './SideBar';
import MissionSide from './MissionSide';
import Cookies from 'js-cookie';
import backgroundImage from "../assets/background2.png";

function DailyRequestDetails(props) {
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState([]);

  const updateProgress = (id) => {
    const len = data[0]?.Services?.length;
    setProgress([...progress, id]);
    const newdata = (progress.length / len) * 100;
    axios.put(`http://localhost:3000/mission/update/${id}`, { progress: newdata });
  }

  const confirmMission = () => {
    const len = data[0]?.Services?.length;
    if (len === progress.length) {
      axios.post("http://localhost:3000/notification/postnotification", { message: 'your mission has been completed', client_id: data.client_id, status: 'completed' });
    } 
  }

  useEffect(() => {
    const id = Cookies.get('user');
    axios.get(`http://localhost:3000/supervisor/service/${id}`)
      .then((res) => {
        console.log("your data is here", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-teal-100 min-h-screen flex flex-grow justify-between items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto px-2 py-8 w-full flex-1">
        <NavBar changeView={props.changeView}/>
        <div className="flex space-x-4 mt-7">
          <SideBar changeView={props.changeView}/>
          <div className="bg-white p-8 rounded-md w-full">
            <div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
                    <div className="px-4 py-2">
                      <h1 className="text-gray-800 font-bold text-2xl uppercase">Tasks List</h1>
                    </div>
                    {
                      data[0]?.Services?.map((e) => (
                        <div key={e.id} className="py-4 px-8">
                          <div className="flex items-center">
                            <input
                              id={`todo${e.id}`}
                              name={`todo${e.id}`}
                              type="checkbox"
                              className="h-6 w-6 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                              onChange={() => updateProgress(e.id)}
                            />
                            <label htmlFor={`todo${e.id}`} className="ml-3 flex items-center text-lg font-medium">
                              <img
                                src={e.image}
                                alt="Rounded Image"
                                className="h-12 w-12 rounded-full"
                              />
                              <span className="ml-2">{e.name}</span>
                            </label>
                            
                          </div>
                          
                        </div>
                      ))
                    }
                    <div className="flex justify-end">
                      <button onClick={()=>{props.changeView("UpdateMission")}} className="py-2 px-8 bg-teal-500 text-white rounded hover:bg-teal-600">Confirm</button>
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

export default DailyRequestDetails;
