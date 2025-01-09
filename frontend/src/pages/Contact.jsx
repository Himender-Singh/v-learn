import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { BASE_URL } from '../config';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/user/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message); // Show success toast
        setFormData({ email: '', subject: '', message: '' }); // Clear form after submission
      } else {
        toast.error(data.message || 'Failed to send message. Please try again later.'); // Show error toast
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('An error occurred while sending the message. Please try again later.'); // Show error toast
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
        <p className='text-center font-semibold text-lg m-5 mb-7'>We'd love to hear from you! Please fill out the form below and we will get back to you shortly.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block text-gray-700 text-sm font-semibold mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter the subject"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Type your message here"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </div>
        </form>
        <ToastContainer /> {/* Add ToastContainer here */}
      </div>
    </div>
  );
};

export default Contact;
