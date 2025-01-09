import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import TrainerCard from '../../pages/Trainers/TrainerCard';
import Loader from '../../components/Loader';

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);


  if (loading) {
    return (
      <Loader time={1500}/>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-lg font-semibold">
          Oops! Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-gray-500 text-lg font-medium mb-4">
          No bookings found. Book your next driving session now!
        </p>
        <a
          href="/trainers"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Explore Trainers
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          My Bookings
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Here are your scheduled sessions with our trainers. Click on
          see all to view more details about your booking.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200 overflow-hidden"
            >
              <TrainerCard trainer={appointment} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
