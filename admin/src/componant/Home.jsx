import React, { useEffect,useState } from "react";
import Chart from "./Charts";
import AllRequests from "./Allrequest";
import axios from "axios";

function Home() {
  const [data,setData]=useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/team/getteam').then((res)=>{
      setData(res.data.reverse().slice(0,3))
    })
  },[])
  return (
    <div>
      <div className=" flex w-full h-96 flex-cols gap-5">
        <div className="w-2/4">
          <Chart />
        </div>
        <div className="w-2/4">
          <div className="bg-white w-full h-full rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="font-bold p-5 text-xl">Teams</h2>
              <h3 className="p-5 text-cyan-600 font-semibold">See all</h3>
            </div>
            <div className="w-full grid gap-5 px-4">
              <div
                style={{ backgroundColor: "#ECF7FF" }}
                className="h-20  rounded-md"
              >
                <div className="flex m-3 justify-center">
                <h1 className="text-black  font-bold">Team Name : </h1>
                <h3 className="mx-5 font-semibold">{data[0]?.name}</h3>
                </div>
                
              </div>
              <div
                style={{ backgroundColor: "#ECF7FF" }}
                className="h-20  rounded-md"
              >
                <div className="flex m-3 justify-center">
                <h1 className="text-black  font-bold">Team Name : </h1>
                <h3 className="mx-5 font-semibold">{data[1]?.name}</h3>
                </div>
              </div>
              <div
                style={{ backgroundColor: "#ECF7FF" }}
                className="h-20  rounded-md"
              >
                <div className="flex m-3 justify-center">
                <h1 className="text-black  font-bold">Team Name : </h1>
                <h3 className="mx-5 font-semibold">{data[2]?.name}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-10 gap-x-3 ">
        <div className="flex-1 p-5 bg-white rounded-xl">
          <div className=" font-semibold text-lg">Total Request</div>
          <div className=" font-bold text-base text-blue-600 mt-2">100</div>
        </div>
        <div className="flex-1 p-5 bg-white rounded-xl">
          <div className=" font-semibold text-lg ">Total User</div>
          <div className=" font-bold text-base text-blue-600 mt-2">50</div>
        </div>
        <div className="flex-1 p-5 bg-white rounded-xl">
          <div className=" font-semibold text-lg ">Total Team</div>
          <div className=" font-bold text-base text-blue-600 mt-2">20</div>
        </div>
        <div className="flex-1 p-5 bg-white rounded-xl">
          <div className=" font-semibold text-lg ">Total Mission</div>
          <div className=" font-bold text-base text-blue-600 mt-2">30</div>
        </div>
      </div>
      <div className="flex mt-4 bg-white rounded-lg p-5">
        <h1 className=" text-lg font-medium">Recent Missions</h1>
      </div>
      <div className="mt-5">
        <AllRequests />
      </div>
    </div>
  );
}

export default Home;
