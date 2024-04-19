import React, { useState,useEffect } from 'react'
import profil from '../assets/profil-icon.png';
import trash from '../assets/trash.png';
import axios from 'axios'
import NavBar from './NavBar';
import SideBar from './SideBar';
import MissionSide from './MissionSide';
import backgroundImage from "../assets/background2.png";

function AllClients(props) {
  const [status, setStatus] = useState('Completed');
  const [data,setData] = useState([])


  useEffect(()=>{
    axios.get("http://localhost:3000/client/getclient").then((res)=>{
      console.log("your data is here");
      setData(res.data)
    })
    .catch((err)=>{console.log(err);})
  }, [])

    return (
		<div className="bg-teal-100 min-h-screen flex flex-grow justify-between items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="container mx-auto px-2 py-8 w-full flex-1">
    <NavBar changeView={props.changeView}/>
      <div className="flex space-x-4 mt-7">
      <SideBar changeView={props.changeView}/>
      <div class="bg-white p-8 rounded-md w-full">
	
		<div>
			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table class="min-w-full leading-normal">
						<thead>
							<tr>
								<th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Customer Name
								</th>
								<th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
								</th>
								<th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
								</th>
								
								<th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
								</th>
							</tr>
						</thead>
						{
              data.map((e)=>{
                return (
                  <tbody>
							<tr>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<div class="flex items-center">
										<div class="flex-shrink-0 w-10 h-10">
											<img class="w-full h-full rounded-full" src={e.image} alt="" />
                      </div>
											<div class="ml-3">
												<p class="text-gray-900 whitespace-no-wrap">
                        {e.fullName}
												</p>
											</div>
										</div>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {e.phone}
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {e.email}
								</td>
								
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="bg-white ml-6 mr-6 rounded-md shadow p-1.5 m-1">
                        <button className="text-blue-500 hover:text-blue-700 font-bold w-20 text-sm">View</button>
                      </div>
								</td>
							</tr>
							
						</tbody>
                )
              })
            }
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

export default AllClients
