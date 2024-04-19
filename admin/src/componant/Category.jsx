import React, { useState } from 'react';
import axios from 'axios';

function Category(props) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
  };

  const uploadToCloudinary = async () => {
    try {
      const formData = new FormData();
      formData.append('file', categoryImage);
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
        const response = await axios.post('http://localhost:3000/category/addCategory', {
          image: imageUrl,
          name: categoryName
        });
        console.log('Category added successfully:', response.data);
      } catch (error) {
        setError('Error adding category to database');
        console.error('Error adding category:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Create Category</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          id="categoryName"
          type="text"
          value={categoryName}
          onChange={handleNameChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="categoryImage" className="block text-sm font-medium text-gray-700">Category Image</label>
        <input
          id="categoryImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        onClick={()=>{confirm(),props.change('home')}}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Create Category
      </button>
    </div>
  );
}

export default Category;
