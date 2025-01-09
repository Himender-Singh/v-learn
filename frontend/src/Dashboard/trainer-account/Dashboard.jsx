import React, { useState } from "react";
import {
  FiHome,
  FiCalendar,
  FiUser,
  FiSearch,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import TrainerAbout from "../../pages/Trainers/TrainerAbout";
import VerificationDialog from "./VerificationDialog";
import Profile from "./Profile";
import Appointment from "./Appointment";
import Trainers from "../../pages/Trainers/Trainers";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data, loading, error } = useFetchData(
    `${BASE_URL}/trainer/profile/me`
  );

  const [isVerificationDialogOpen, setVerificationDialogOpen] = useState(
    data?.verification
  );

  const tabs = [
    { name: "Overview", icon: <FiHome />, description: "Dashboard overview." },
    { name: "Appointments", icon: <FiCalendar />, description: "Manage schedules." },
    { name: "Profile", icon: <FiUser />, description: "View and edit profiles." },
    { name: "Search", icon: <FiSearch />, description: "Search the platform." },
  ];

  const handleEmailCopy = (email) => {
    navigator.clipboard
      .writeText(email)
      .then(() => toast.success("Email copied!"))
      .catch(() => toast.error("Copy failed."));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="font-semibold text-lg mb-3 text-gray-700">Verification</h2>
              {data?.verification ? (
                <div className="bg-yellow-100 p-4 rounded-lg text-yellow-600">
                  <p>Verification is pending. Complete for better performance.</p>
                </div>
              ) : (
                <Link
                  to="#"
                  className="bg-blue-100 p-4 rounded-lg text-blue-600 flex justify-between items-center"
                  onClick={() => {
                    handleEmailCopy(data?.email);
                    setVerificationDialogOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    <HiBadgeCheck className="text-blue-600 mr-2" size={20} />
                    <p>Complete your profile first for better performance. Then only you will able to increase your performance.</p>
                  </div>
                  
                </Link>
              )}
            </div>
            <VerificationDialog
              isOpen={isVerificationDialogOpen}
              onRequestClose={() => setVerificationDialogOpen(false)}
              trainerData={data}
            />
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <BeatLoader color="#ff6347" size={15} />
              </div>
            ) : (
              <TrainerAbout trainer={data} />
            )}
          </div>
        );
      case "Appointments":
        return <Appointment appointment={data.appointments} />;
      case "Profile":
        return <Profile trainerData={data} />;
      case "Search":
        return   <Trainers />
      default:
        return <p>Select a tab.</p>;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Mobile Hamburger Navbar */}
      <div className="bg-red-600 text-white p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl font-bold">Trainer System</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`sticky inset-x-0 top-0 bg-gradient-to-br from-red-600 to-black text-white w-full z-20 transform ${
          isSidebarOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 md:translate-y-0`}
      >
        <nav className="flex justify-center items-center p-5 space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center gap-4 px-6 py-2 rounded-lg ${
                activeTab === tab.name
                  ? "bg-white text-red-600 shadow-lg"
                  : "hover:bg-red-700"
              }`}
              onClick={() => {
                setActiveTab(tab.name);
                setIsSidebarOpen(false); // Close sidebar on mobile after selection
              }}
            >
              {tab.icon}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-4xl font-bold mb-6">{activeTab}</h1>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
