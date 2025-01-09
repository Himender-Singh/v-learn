// TrainerCard.js
import React from "react";
import { FaStar, FaMapMarkerAlt, FaCertificate } from "react-icons/fa";
import { Link } from "react-router-dom";

const TrainerCard = ({ trainer }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl">
      {/* Trainer Image */}
      <img
        src={trainer.photo || "https://via.placeholder.com/150"}
        alt={trainer.name}
        className="w-full p-2 h-56 object-cover"
      />

      {/* Trainer Details */}
      <div className="p-6">
        <h2 className="text-2xl p-2 bg-red-700 rounded font-bold text-gray-50 text-center">
          {trainer.name}
        </h2>
        <div className="flex justify-center p-2 bg-gray-100 rounded items-center text-gray-500 mt-2">
          <FaMapMarkerAlt className="mr-1" />
          <span>{trainer.address}</span>
        </div>
        <div className="flex items-center justify-start">
          <p className="text-gray-50 rounded-xl font-semibold p-3 bg-black mt-4">
            {trainer.specialization}
          </p>
          {/* Rating */}
          <div className="absolute right-8">
            <div className="flex items-center justify-center mt-4">
              {[...Array(1)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(trainer.averageRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">
                {trainer.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-gray-600">
            <strong>Phone no:</strong> {trainer.phone}
          </p>
          <p className="text-gray-600">
            <strong>Experience:</strong>{" "}
            {trainer.experiences?.length || 0} years
          </p>
          <p className="text-gray-600">
            <strong>Price per session:</strong> ₹{trainer.ticketPrice}/Day
          </p>
          <div className="flex items-center space-x-2">
            <FaCertificate className="text-blue-500" />
            <span className="text-gray-600">
              {trainer.qualifications?.length || 0} Certifications
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-6">
          <Link to={`/trainers/${trainer._id}`}>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full shadow hover:opacity-80 transition duration-300">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
