import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Service(props) {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceImage, setServiceImage] = useState(null);
  const [servicePrice, setServicePrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/category/getCategories');
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const changename = (e) => {
    setServiceName(e.target.value);
  };

  const changedescription = (e) => {
    setServiceDescription(e.target.value);
  };

  const dchangeimage = (e) => {
    const file = e.target.files[0];
    setServiceImage(file);
  };

  const changeprice = (e) => {
    setServicePrice(e.target.value);
  };

  const changecategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const uploadToCloudinary = async () => {
    try {
      const formData = new FormData();
      formData.append('file', serviceImage);
      formData.append('upload_preset', 'teamrbk');
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dp9xsppna/upload',
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      setError('Error uploading image to Cloudinary');
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const confirm = async () => {
    const imageUrl = await uploadToCloudinary();
    if (imageUrl) {
      try {
        const response = await axios.post('http://localhost:3000/services/addService', {
          name: serviceName,
          description: serviceDescription,
          image: imageUrl,
          price: servicePrice,
          category_id: selectedCategory
        });
        console.log(response.data);
    
      } catch (error) {
        setError('Error adding service to database');
        console.error('Error adding service:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Add Service</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">Service Name</label>
        <input
          id="serviceName"
          type="text"
          value={serviceName}
          onChange={changename}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700">Service Description</label>
        <textarea
          id="serviceDescription"
          value={serviceDescription}
          onChange={changedescription}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="servicePrice" className="block text-sm font-medium text-gray-700">Service Price</label>
        <input
          id="servicePrice"
          type="number"
          value={servicePrice}
          onChange={changeprice}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Select Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={changecategory}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="serviceImage" className="block text-sm font-medium text-gray-700">Service Image</label>
        <input
          id="serviceImage"
          type="file"
          accept="image/*"
          onChange={dchangeimage}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        onClick={()=>{confirm(),props.change('home')}}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Add Service
      </button>
    </div>
  );
}

export default Service;
