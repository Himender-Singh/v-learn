import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL, token } from '../../config';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';

const Profile = ({ userdata }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log("userdata",userdata);

  const [formData, setFormData] = useState({
    name: userdata.name || '',
    email: userdata.email || '',
    role: userdata.role || 'trainee',
    gender: userdata.gender || 'male',
    photo: userdata.photo || null,
    address: userdata.address || '', // New field for address
    dob: userdata.dob || '', // New field for date of birth
  });

  useEffect(() => {
    setFormData({
      name: userdata.name || '',
      email: userdata.email || '',
      role: userdata.role || 'trainee',
      gender: userdata.gender || 'male',
      photo: userdata.photo || null,
      address: userdata.address || '', // Set initial value from userdata
      dob: userdata.dob || '', // Set initial value from userdata
    });
    setPreviewURL(userdata.photo || '');
  }, [userdata]);

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
      const res = await fetch(`${BASE_URL}/users/${userdata._id}`, {
        method: 'PUT', // Change to PUT for update
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      toast.success("Profile updated successfully!");
      navigate("/users/profile/me"); // Navigate to account page after update
    } catch (error) {
      console.error("Error during profile update:", error);
      toast.error("Profile update failed. Please try again.");
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Profile</h2>
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
          <div className="flex items-center mb-6">
            <div className="mr-4 w-1/2">
              <label htmlFor="role" className="block text-gray-700 text-sm font-semibold mb-2">Role:</label>
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
          <div className="mb-6">
            <label htmlFor="address" className="block text-gray-700 text-sm font-semibold mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter your address"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="dob" className="block text-gray-700 text-sm font-semibold mb-2">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              
              className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
            />
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
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
          <div className="mt-6">
            Want to return to your account? <Link to="/my-account" className="text-blue-500">Go to My Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
