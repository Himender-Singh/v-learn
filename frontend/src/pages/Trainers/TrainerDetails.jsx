import React, { useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import TrainerAbout from "./TrainerAbout";
import TrainerFeedback from "./TrainerFeedback";
import SidePanel from "./SidePanel";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import TrainerCardAbout from "./TrainerCardAbout";
import Loader from "../../components/Loader";

const TrainerDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("about");

  const { id } = useParams();
  const { data, loading, error } = useFetchData(`${BASE_URL}/trainer/${id}`);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle loading and error states
  if (loading) {
    return <Loader/> ;
  }

  // if (error) {
  //   return <p className="text-red-500">Failed to fetch trainer details.</p>;
  // }

  return (
    <div className="flex capitalize flex-col items-center justify-start min-h-screen  p-6">
      {/* Trainer Details Section */}
      <div className="mt-10 w-full max-w-screen-xl flex flex-col md:flex-row  overflow-hidden">
        <div className="w-full md:w-1/3">
          <img
            src={data?.photo}
            alt="Trainer"
            className="w-full h-full p-2 object-cover"
          />
        </div>
        <div className="w-full md:w-2/3 p-6">
          <p className="p-3 rounded-lg bg-black font-semibold  text-gray-50 w-56">
            {" "}
            {data?.specialization}{" "}
          </p>
          <h2 className="text-2xl font-semibold text-gray-800">{data?.name}</h2>
          <div className="flex items-center mt-4">
            <FaStar
              className={`h-5 w-5 ${
                data?.totalRating > 0 ? "text-yellow-400" : "text-gray-300"
              }`}
            />
            <span className="ml-2 text-gray-600">{data?.totalRating}/5</span>
          </div>
          <p className="text-gray-800 font-normal mt-3"> <span className="text-blue-700 font-semibold">About me:</span> {data?.bio}</p>
          <p className="text-gray-800 font-normal mt-3"> <span className="text-blue-700 font-semibold">Phone no:</span> {data?.phone}</p>
          <p className="text-gray-800 font-normal mt-3"> <span className="text-blue-700 font-semibold">Address:</span> {data?.address}</p>
          
        </div>
        <div className="">
          <SidePanel ticketPrice={data?.ticketPrice} trainerId={data?._id} timeSlots={data?.timeSlots} />
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="h-[2px] bg-gray-200 mt-5 w-full max-w-4xl"></div>

      {/* Tabs and Content */}
      <div className="mt-6 w-full max-w-screen-lg">
        <div className="flex space-x-4 justify-center">
          <button
            className={`px-4 py-2 rounded-lg transition duration-200 ${
              activeTab === "about"
                ? "border-2 border-blue-500 text-blue-500 font-semibold"
                : "bg-yellow-100 text-gray-700"
            }`}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition duration-200 ${
              activeTab === "feedback"
                ? "border-2 border-blue-500 text-blue-500 font-semibold"
                : "bg-yellow-100 text-gray-700"
            }`}
            onClick={() => setActiveTab("feedback")}
          >
            Feedback
          </button>
        </div>
        <div className="mt-4">
          {activeTab === "about" ? <TrainerCardAbout trainer={data} /> : <TrainerFeedback reviews={data?.reviews} totalRating={data?.totalRating} />}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
