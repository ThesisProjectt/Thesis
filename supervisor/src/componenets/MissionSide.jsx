import React from 'react'

function MissionSide(props) {
  return (
    <div className='w-96 '>
      {props.data?.map((e) => {
        {console.log("e",e);}
              return (
                <div className="bg-white rounded-md p-5">
                  <h6 className="text-lg font-semibold mb-4">
                    Today's Mission Details
                  </h6>
                  <h1 className="text-lg font-semibold mb-4">Pack Name: </h1> <p>{e.name}</p>
                  
                  <p className="text-gray-600 m-5"> <h6 className="text-lg font-semibold mb-2">Tasks: </h6>{e.Services?.map((el)=>{
                    
                    {console.log("el",el);}
                    return (
                      
                      <p>{el.name}</p>
                    )
                  })}</p>
                  <button
                    className="bg-teal-500 w-full text-white px-5 py-2 rounded-md hover:bg-teal-700"
                    onClick={() => props.changeView("DailyRequestDetails")}
                  >
                    Check Details
                  </button>
                </div>
              );
            })}
    </div>
  )
}

export default MissionSide
