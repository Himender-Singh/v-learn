import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadImageToCloudinary from '../utils/uploadCloudinary';
import { BASE_URL } from '../config';

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'trainee',
    gender: 'male',
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const data = await uploadImageToCloudinary(file);
        setPreviewURL(data.secure_url);
        setSelectedFile(data.secure_url);
        setFormData((prevData) => ({ ...prevData, photo: data.secure_url }));
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to register');
      }

      toast.success("Registration successful!");
      setFormData("");
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center mb-6">
            <div className="mr-4 w-1/2">
              <label htmlFor="role" className="block text-gray-700 text-sm font-semibold mb-2">Are you a:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
              >
                <option value="trainee">Trainee</option>
                <option value="trainer">Trainer</option>
              </select>
            </div>
            <div className="w-1/2">
              <label htmlFor="gender" className="block text-gray-700 text-sm font-semibold mb-2">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <div className="flex-grow mr-4">
              <label htmlFor="photo" className="block text-gray-700 text-sm font-semibold mb-2">Upload Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
              />
            </div>
            {previewURL && (
              <div className="ml-4">
                <img
                  src={previewURL}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-md border border-gray-300"
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg"
            >
              {loading ? 'Signing Up...' : 'Signup'}
            </button>
          </div>
          <div className="mt-6">
            Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
