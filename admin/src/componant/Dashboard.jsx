import React, { useState } from "react";
import logo from "../assets/h-logo.png";
import profil from "../assets/profil-icon.png";
import notif from "../assets/notif.png";
import search from "../assets/Search.png";
import arrow from "../assets/arrow-down.png";
import Home from "./Home";
import Employeelist from "./Employeelist";
import Clientlist from "./Clientlist";
import Createteam from "./Createteam";
function Dashboard() {

  const [showDropdown, setShowDropdown] = useState(false);
  const [view,setView]=useState('home');

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const render=()=>{
    if (view==='employee') return <Employeelist/>;  
    else if (view==='home') return <Home />;
    else if (view==='clientlist') return <Clientlist />;
    else if (view==="createteam")return <Createteam />
  }
  const changeView = (newView) => {
    setView(newView);
  };
  

  return (
    <div  style={{   height:"100%" }}>
      <div className="container mx-auto px-4 py-8 max-w-8xl">
        <header className="flex justify-between items-center">
          <div>
            <img src={logo} alt="Logo" className="h-14" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <img src={search} alt="Search" className="h-6" />
              </button>
            </div>
            <button className="text-gray-600 hover:text-gray-800">
              <img src={notif} alt="Notification" className="h-8" />
            </button>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-600 hover:text-gray-800 flex items-center focus:outline-none"
              >
                <img src={profil} alt="Profile" className="h-8 mr-2" />
                <span className="mr-2">John Doe</span>
                <img src={arrow} alt="Dropdown" className="h-4" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex mt-20">
          <div className="w-1/4 mr-8">
            <div className="bg-white rounded-md p-6 mb-8">
              <button className="bg-teal-500 w-full text-white px-5 py-3 rounded-md hover:bg-teal-700" onClick={()=>{
                changeView('createteam')
              }}>
                Create a team
              </button>
            </div>
            <div className="bg-white rounded-md p-4 mb-8">
              <ul>
                <li className="text-teal-500 font-bold p-2" onClick={()=>{changeView('home')}}>Dashboard</li>
                <li className="text-gray-700 p-2 hover:text-teal-500" onClick={()=>{changeView('clientlist')}}>Customer list</li>
                <li className="text-gray-700  p-2 hover:text-teal-500" onClick={()=>{changeView('employee')}}>List of employees</li>
                <li className="text-gray-700  p-2 hover:text-teal-500">List of teams</li>
                <li className="text-gray-700  p-2 hover:text-teal-500">Create Pack</li>
                <li className="text-gray-700  p-2 hover:text-teal-500">Create Service</li>
                <li className="text-gray-700  p-2 hover:text-teal-500">Create Category</li>

              </ul>
            </div>
          </div>
          <div className="w-full">
            {render()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
