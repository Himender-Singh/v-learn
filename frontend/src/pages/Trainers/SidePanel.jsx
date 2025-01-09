import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import Loader from "../../components/Loader";

const SidePanel = ({ trainerId, ticketPrice, timeSlots = [] }) => {
  const available = timeSlots.length > 0; // Check if there are available time slots
  const [loader, setLoader] = useState(false);

  // State to manage the description visibility
  const [isExpanded, setIsExpanded] = useState(false);


  const handleBook = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${BASE_URL}/booking/checkout-session/${trainerId}`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + " Please try again");
      }

      setLoader(false);

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      toast.error(error.message);
      setLoader(false);
    }
  };

  return (
    <div className="mr-10 w-full max-w-lg p-7 h-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
      {/* Show Loader when loader is true */}
      {loader && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      )}
      <h3 className="text-3xl font-semibold text-white mb-4">Appointment Booking</h3>
      <div className="mb-6">
        <table className="w-full text-white">
          <tbody>
            <tr className="border-b border-white py-2">
              <td className="py-2">Ticket Price:</td>
              <td className="font-semibold text-lg">${ticketPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {available && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-white">Available Time Slots:</h4>
          <ul className="text-white mt-2">
            {timeSlots.slice(0, isExpanded ? timeSlots.length : 2).map((slot, index) => (
              <li key={index} className="flex items-center mb-1">
                <div className="bg-white text-blue-600 flex justify-between items-center w-full px-3 py-1 text-sm font-semibold rounded-full">
                  <span className="mr-4">{slot.day}</span>
                  <span>{`${slot.startingTime} - ${slot.endingTime}`}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Read More / Read Less section */}
      {timeSlots.length > 2 && (
        <div className="mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white underline focus:outline-none"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      )}
      <button
        onClick={handleBook}
        className="w-full bg-white text-blue-600 py-3 rounded-md font-bold hover:bg-blue-100 transition-colors duration-200 mt-4"
      >
        Book Now
      </button>
    </div>
  );
};

export default SidePanel;
