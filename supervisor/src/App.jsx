// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

import Home from "./componenets/Home";
import Dashboard from "./componenets/Dashboard";
import AllRequests from "./componenets/AllRequests";
import AllClients from "./componenets/AllClients";
import MyTeam from "./componenets/MyTeam";
import DailyRequestDetails from "./componenets/DailyRequestDetails";
import UpdateStatus from "./componenets/UpdateStatus";
import Presence from "./componenets/Presence";
import UpdateMission from "./componenets/UpdateMission";

import backgroundImage from "./assets/background2.png"; // Import your background image
import SideBar from "./componenets/SideBar";
import MissionSide from "./componenets/MissionSide";
import NavBar from "./componenets/NavBar";
function App() {
  const [view, setView] = useState("Home");
  
  const [status, setStatus] = useState("Completed");
  const [data, setData] = useState([]);
  const [state, setState] = useState(false)

  const changeView = (newView) => {
    console.log("Changing view to:", newView);
    setView(newView);
  };

  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/supervisor/service/1`)
      .then((res) => {
        console.log("your data is here", res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderView = () => {
    console.log("Current view:", view);
    if (view === "Dashboard") {
      return <Dashboard changeView={changeView} data={data}/>;
    } else if (view === "Home") {
      return <Home setState={setState} changeView={changeView}/>;
    } else if (view === "AllRequests") {
      return <AllRequests changeView={changeView} data={data}/>;
    } else if (view === "AllClients") {
      return <AllClients changeView={changeView} data={data}/>;
    } else if (view === "MyTeam") {
      return <MyTeam changeView={changeView}  setView={setView} data={data} />;
    } else if (view === "DailyRequestDetails") {
      return <DailyRequestDetails changeView={changeView} data={data}/>;
    } else if (view === "UpdateStatus") {
      return <UpdateStatus changeView={changeView}  setView={setView} data={data}/>;
    } else if (view === "Presence") {
      return <Presence changeView={changeView}  setView={setView} data={data}/>;
    } else if (view === "UpdateMission") {
      return <UpdateMission changeView={changeView}  setView={setView} data={data}/>;
    }
  };

  return (
  
    <div >
      <div className="flex-1">{renderView()}</div>
    </div>
  );
}

export default App;
