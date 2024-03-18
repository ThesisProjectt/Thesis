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
      return <Dashboard />;
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
    <div className="" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}> {/* Set background image */}
      <div className="container mx-auto px-4 py-8 max-w-8xl h-screen"> {/* Adjusted height to fill viewport */}
        <header className="flex justify-between items-center w-full"> {/* Adjusted width to full */}
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
        {/* Content */}
        <div className="flex ml-20 justify-between items-center w-full"> {/* Adjusted width to full */}
          <div className="">
            <div className="container px-4 py-8 flex space-x-4">
              {/* Content section */}
              <div className="flex flex-col">
                <div className="bg-white rounded-md w-72 p-6 mb-4">
                  <button className="bg-red-700 w-60 text-white px-5 py-2 rounded-md hover:bg-red-600">Report</button>
                </div>
                <div className="bg-white rounded-md w-72 p-4 mb-4"> {/* Adjusted width to w-72 */}
                  <ul>
                    <li className="py-2" onClick={() => changeView('Dashboard')}>
                      Dashboard
                    </li>
                    <li className="py-2" onClick={() => changeView('AllClients')}>Client List</li>
                    <li className="py-2" onClick={() => changeView('AllRequests')}>All Requests</li>
                    <li className="py-2" onClick={() => changeView('MyTeam')}>My Team</li>
                  </ul>
                </div>

                {/* Third Section */}
                <div className="bg-white rounded-md p-5 w-72"> {/* Adjusted width to w-72 */}
                  <h2 className="text-lg font-semibold mb-4">Today's Mission Details</h2>
                  <p className="text-gray-600 m-5">hello</p>
                  <button className="bg-teal-500 w-60 text-white px-5 py-2 rounded-md hover:bg-teal-700" onClick={() => changeView('DailyRequestDetails')}>Check Details</button>
                </div>
              </div>

              {/* Dashboard Section */}
              <div className="flex-4">
                {renderView()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
