import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreatePack(props) {
  const [packName, setPackName] = useState('');
  const [status, setStatus] = useState('');
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/services/getServices');
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);

  const handlePackNameChange = (e) => {
    setPackName(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleServiceChange = (e) => {
    const serviceId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    }
  };

  const confirm = async () => {
    try {
      const response = await axios.post('http://localhost:3000/pack/addPack', {
        name: packName,
        status: status,
      });
      console.log(selectedServices);
      selectedServices.map( async(e,i)=>{
         const x =await axios.post('http://localhost:3000/packhasservice/addAPack',{
            pack_id: response.data.id,
            service_id:e
         })
         console.log(x.data);
      })
      
    } catch (error) {
      setError('Error adding pack to database');
      console.error('Error adding pack:', error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Create Pack</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label htmlFor="packName" className="block text-sm font-medium text-gray-700">Pack Name</label>
        <input
          id="packName"
          type="text"
          value={packName}
          onChange={handlePackNameChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <input
          id="status"
          type="text"
          value={status}
          onChange={handleStatusChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Services</label>
        {services.map((service) => (
          <div key={service.id} className="flex items-center">
            <input
              type="checkbox"
              id={`service-${service.id}`}
              value={service.id}
              onChange={handleServiceChange}
              className="mr-2"
            />
            <label htmlFor={`service-${service.id}`} className="mr-4">{service.name}</label>
          </div>
        ))}
      </div>
      <button
        onClick={()=>{confirm();props.change('home');}}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Create Pack
      </button>
    </div>
  );
}

export default CreatePack;
