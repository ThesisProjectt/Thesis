import React, { useState,useEffect } from 'react';
import profil from '../assets/profil-icon.png';
import trash from '../assets/trash.png';
import axios from 'axios'
function AllRequests() {
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
                Progress
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
									12/12/1222
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {status === 'Completed' ? (
                        <div className="flex items-center">
                          <div className="w-2 h-2 ml-4 mr-4 rounded-full bg-green-500 "></div>
                          Completed
                        </div>
                      ) : (
                        <div className="flex ml-6 mr-6 items-center">
                          <div className="w-2 h-2 ml-6  mr-6 rounded-full bg-orange-500 "></div>
                          In Progress
                        </div>
                      )}
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                        <div className={`w-16 bg-gray-200 h-1 mr-2 relative ${status === 'Completed' ? 'bg-green-500' : 'bg-orange-500'}`}>
                          <div className="absolute top-0 left-0 h-full" style={{ width: '50%', backgroundColor: status === 'Completed' ? '#34D399' : '#FBBF24' }}></div>
                        </div>
                        50%
                      </div>
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
  );
}

export default AllRequests;
