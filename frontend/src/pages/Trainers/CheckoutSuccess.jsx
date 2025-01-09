import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center text-center space-y-6">
        <AiOutlineCheckCircle className="text-green-500 w-20 h-20" />
        <h1 className="text-2xl font-semibold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600">
          Thank you for your payment. Your transaction has been successfully completed. You can now check your bookings or return to the homepage.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleGoHome}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => navigate('/mybooking')}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
          >
            View Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
