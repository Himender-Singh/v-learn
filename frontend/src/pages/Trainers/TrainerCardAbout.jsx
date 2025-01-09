import React, { useContext } from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import { HiChartBar } from "react-icons/hi";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const TrainerCardAbout = ({ trainer }) => {
  const { user, role, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    window.location.reload();
    navigate("/login");
  };

  if (!trainer) {
    return (
      <Loader showLoader={2000}/>
    );
  }

  const qualificationsToShow = trainer.qualifications && trainer.qualifications.length > 0
    ? trainer.qualifications
    : [{ description: "", startDate: "", endDate: "" }, { description: "First Aid Certification", startDate: "", endDate: "" }];

  const experiencesToShow = trainer.experiences && trainer.experiences.length > 0
    ? trainer.experiences
    : [{ position: "", startDate: "", endDate: "" }, { position: "", startDate: "", endDate: "" }];

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">
      {/* Profile Section */}
      <div className="grid lg:grid-cols-1 gap-8 items-center bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-xl p-6">
        

        {/* Trainer Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
            <span className="block font-semibold text-gray-700">Name:</span>
            <h2 className="text-2xl capitalize font-bold text-gray-800 bg-gray-100 p-2 rounded-md">
              {trainer.name}
            </h2>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
            <span className="block font-semibold text-gray-700">Specialization:</span>
            <p className="flex items-center bg-gray-100 p-2 rounded-md text-gray-800">
              <HiChartBar className="mr-2 text-yellow-500" />
              {trainer.specialization}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
            <span className="block font-semibold text-gray-700">Average Rating:</span>
            <div className="flex items-center bg-gray-100 p-2 rounded-md text-gray-800">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < (trainer.averageRating || 0)
                      ? "mr-1 text-yellow-500"
                      : "mr-1 text-gray-300"
                  }
                />
              ))}
              <span className="ml-2">
                {trainer.averageRating ? trainer.averageRating.toFixed(1) : "0"} / 5
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
              <span className="block font-semibold text-gray-700">Email:</span>
              <p className="flex items-center bg-gray-100 p-2 rounded-md text-gray-800 group">
                <FaEnvelope className="mr-2 text-green-500" />
                {trainer.email}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
              <span className="block font-semibold text-gray-700">Phone:</span>
              <p className="flex items-center bg-gray-100 p-2 rounded-md text-gray-800 group">
                <FaPhone className="mr-2 text-blue-500" />
                {trainer.phone}
              </p>
            </div>
          </div>
          <div className="bg-white capitalize rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
            <span className="block font-semibold text-gray-700">Address:</span>
            <p className="flex items-center bg-gray-100 p-2 rounded-md text-gray-800">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              {trainer.address ? trainer.address : "Address not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Biography Section */}
      <div className="bg-gradient-to-r from-gray-200 to-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
          <FaUserCircle className="mr-2 text-red-500" />
          About
        </h2>
        <p className="text-gray-700 font-semibold">{trainer.about ? trainer.about : "N/A"}</p>
      </div>

      {/* Qualifications Section */}
      <div className="bg-gradient-to-r from-white to-green-100 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
          <FaGraduationCap className="mr-2 text-green-500" />
          Qualifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {qualificationsToShow.map((qual, index) => (
            <div
              key={index}
              className="bg-green-200 border border-green-500 text-gray-800 px-4 py-2 rounded-md shadow-md relative"
            >
              <div className="mb-6">{qual.from}</div>
              <span className="absolute bottom-1 left-4 font-bold text-base text-green-700">From: {qual.startDate}</span>
              <span className="absolute bottom-1 right-1 font-bold text-base text-green-700">To: {qual.endDate}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-gradient-to-r from-white to-blue-100 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
          <FaBriefcase className="mr-2 text-blue-500" />
          Experience
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {experiencesToShow.map((exp, index) => (
            <div
              key={index}
              className="bg-blue-200 border border-blue-500 text-gray-800 px-4 py-2 rounded-md shadow-md relative"
            >
              <div className="mb-6">{exp.position}</div>
              <span className="absolute bottom-1 left-4 text-base font-bold text-blue-600">From: {exp.startDate}</span>
              <span className="absolute bottom-1 right-1 text-base font-bold text-blue-600">To: {exp.endDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerCardAbout;
