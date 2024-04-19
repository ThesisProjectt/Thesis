import React, {useState} from "react";
import logo from "../assets/h-logo.png";
import profil from "../assets/profil-icon.png";
import notif from "../assets/notif.png";
import search from "../assets/Search.png";
import arrow from "../assets/arrow-down.png";
import trash from "../assets/trash.png";

function NavBar(props) {

    const [showDropdown, setShowDropdown] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
    
      const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
      };


  return (
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
              <span className="mr-2">Mohamed Khamessi</span>
              <img src={arrow} alt="Dropdown" className="h-4" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={()=>{window.location.reload()}}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
  )
}

export default NavBar
