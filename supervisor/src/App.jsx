// App.js
import React, { useState, useEffect } from 'react';

import Home from './componenets/Home';
import Dashboard from './componenets/Dashboard'
import AllRequests from './componenets/AllRequests'
import AllClients from './componenets/AllClients'
import MyTeam from './componenets/MyTeam'
import DailyRequestDetails from './componenets/DailyRequestDetails'
import UpdateStatus from './componenets/UpdateStatus'
import logo from './assets/h-logo.png';
import profil from './assets/profil-icon.png';
import notif from './assets/notif.png';
import search from './assets/Search.png';
import arrow from './assets/arrow-down.png';
import trash from './assets/trash.png';
import backgroundImage from './assets/background2.png'; // Import your background image

function App() {
  const [view, setView] = useState('Dashboard');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [status, setStatus] = useState('Completed');

  const changeView = (newView) => {
    console.log('Changing view to:', newView);
    setView(newView);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

 

  

  const renderView = () => {
    console.log('Current view:', view);
    if (view === 'Dashboard') {
      return <Dashboard/>;
    } else if (view === 'Home') {
      return <Home />;
    } else if (view === 'AllRequests') {
      return <AllRequests />;
    }
    else if (view === 'AllClients') {
      return <AllClients />;
    }
    else if (view === 'MyTeam') {
      return <MyTeam changeView={changeView} setView={setView}/>;
    }
    else if (view === 'DailyRequestDetails') {
      return <DailyRequestDetails/>;
    }else if (view === 'UpdateStatus') {
      return <UpdateStatus/>;
    }
  };

  return (
    <div className="w-full h-full flex flex-col" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <header className="flex justify-between items-center py-4 px-8">
        <img src={logo} alt="Logo" className="h-14" />
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
      <div className="flex flex-grow justify-between items-center">
        <div className="container mx-auto px-2 py-8 max-w-8xl flex-1">
          <div className="flex space-x-4">
          <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
  <div class="mb-2 p-4">
  </div>
  <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
    <div onClick={() => changeView('Dashboard')} role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div class="grid place-items-center mr-4">
      </div>
      Dashboard
    </div>
    <div  onClick={() => changeView('AllClients')} role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div class="grid place-items-center mr-4">
      </div>
      Client List
    </div>
    <div onClick={() => changeView('AllRequests')} role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div class="grid place-items-center mr-4" >
      </div>
      All Requests
       <div class="grid place-items-center ml-auto justify-self-end">
      </div>
    </div>
    <div onClick={() => changeView('MyTeam')} role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div class="grid place-items-center mr-4">

      </div>My Team
    </div>
    

  </nav>
  
</div>


            <div className="flex-1">
              {renderView()}
            </div>
            <div className="bg-white rounded-md p-5">
                <h2 className="text-lg font-semibold mb-4">Today's Mission Details</h2>
                <p className="text-gray-600 m-5">hello</p>
                <button className="bg-teal-500 w-full text-white px-5 py-2 rounded-md hover:bg-teal-700" onClick={() => changeView('DailyRequestDetails')}>Check Details</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
