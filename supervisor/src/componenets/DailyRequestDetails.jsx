import React from 'react';
import bed from '../assets/bed.png'

function DailyRequestDetails() {
  return (
    <div>
      <div className="mx-auto bg-white shadow-md rounded-1g overflow-hidden">
        <div className="px-4 py-2">
          <h1 className="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
        </div>
      </div>
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
        <ul className="divide-y divide-gray-200 px-4">
          <li className="py-4">
            <div className="flex items-center">
              <input
                id="todo1"
                name="todo1"
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
               <img
                  src={bed}
                  alt="Rounded Image"
                  className="h-8 w-8 rounded-full ml-8"
                />
              <label htmlFor="todo1" className="ml-3 flex items-center">
                <span className="text-lg font-medium">Make bed</span>
               
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DailyRequestDetails;
