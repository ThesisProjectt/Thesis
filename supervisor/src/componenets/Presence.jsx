import React, { useState } from 'react';
import profil from '../assets/profil-icon.png';
import NavBar from './NavBar';
import SideBar from './SideBar';
import MissionSide from './MissionSide';
import axios from 'axios'
import backgroundImage from "../assets/background2.png";

function Presence(props) {
  const [status, setStatus] = useState('Present'); 

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="bg-teal-100 min-h-screen flex flex-grow justify-between items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto px-2 py-8 w-full flex-1">
        <NavBar changeView={props.changeView}/>
        <div className="flex space-x-4 mt-7">
          <SideBar changeView={props.changeView}/>
          <div className="bg-white p-8 rounded-md w-full">
            <div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden text-center">
  <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Thank you</p>
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

export default Presence;
