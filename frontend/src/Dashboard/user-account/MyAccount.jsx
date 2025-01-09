import React, { useState, useEffect, useContext } from "react";
import { FaRegUser, FaClipboardList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import MyBookings from "./MyBookings"; // Import the MyBookings component
import Profile from "./Profile"; // Import the Profile component
import useFetchData from "../../hooks/useFetchData"; // Custom hook to fetch data
import { BASE_URL } from "../../config"; // Base URL for API calls
import Loader from "../../components/Loader"; // Loader component
import { authContext } from "../../context/AuthContext";

const MyAccount = () => {
  const [activeToggle, setActiveToggle] = useState("settings");
  const [showLoader, setShowLoader] = useState(true); // State to control loader visibility
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const { user, role, dispatch } = useContext(authContext); // Include dispatch from context 

  console.log(BASE_URL);

  const {
    data: userdata,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/profile/me`);

  console.log(userdata,"user data");

  // Effect to hide loader after data is fetched
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowLoader(false), 2000); // Show loader for at least 2 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [loading]);

  const handleLogout = () => {
    // Clear user data from local storage and context
    localStorage.removeItem("token"); // Remove token from local storage
    dispatch({ type: "LOGOUT" }); // Dispatch logout action to context
    navigate("/login");
  };

  const handleToggle = (toggle) => {
    setActiveToggle(toggle);

    // Check if the screen size is mobile or tablet
    if (window.innerWidth <= 768) {
      if (toggle === "settings") {
        navigate("/profile"); // Navigate to Profile Settings page
      } else if (toggle === "bookings") {
        navigate("/mybooking"); // Redirect to My Bookings page
      }
    }
  };

  // Check if user data is loaded
  if (loading || showLoader) {
    return <Loader />; // Use the Loader component
  }

  // Check for error
  // if (error) {
  //   return <div className="text-red-500">Error fetching user data</div>;
  // }

  // Format DOB if it exists
  const formattedDOB = userdata.dob
    ? new Date(userdata.dob).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <section>
      <div className="container max-w-screen-xl bg-gray-50 shadow border rounded mt-5 p-8 mx-auto">
        {/* Buttons Section - Sticks to the top */}
        <div className="flex justify-end space-x-4 mb-4">
          {/* Profile Settings Button */}
          <button
            className={`flex items-center p-3 rounded-lg shadow transition duration-200 ${
              activeToggle === "settings"
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-800 hover:bg-green-200"
            }`}
            onClick={() => handleToggle("settings")}
          >
            <FaRegUser className="mr-2" />
            Profile Settings
          </button>

          {/* My Bookings Button */}
          <button
            className={`flex items-center p-3 rounded-lg shadow transition duration-200 ${
              activeToggle === "bookings"
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-800 hover:bg-blue-200"
            }`}
            onClick={() => handleToggle("bookings")}
          >
            <FaClipboardList className="mr-2" />
            My Bookings
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* User Image and Details Section */}
          <div className="md:w-1/2 p-6 flex flex-col">
            {/* User Image */}
            <div className="flex-shrink-0 p-2 rounded-full">
              <img
                src={userdata.photo}
                alt={`${userdata.name}'s profile`}
                className="w-full h-80 rounded p-1 shadow-md"
              />
            </div>
            {/* User Details */}
            <div className="mt-4">
              <h2 className="text-2xl capitalize font-semibold text-gray-800 mb-2">
                {userdata.name || "User Profile"}
              </h2>
              <form className="space-y-4">
                <button onClick={handleLogout} className="bg-red-600 rounded-lg text-white hover:bg-red-800 px-12 py-2 text-lg font-bold mt-4">
                  Logout
                </button>
                <div className="bg-gray-950 p-4 rounded-md">
                  <label className="block text-gray-50">
                    <strong>Email:</strong>
                    <span className="block">{userdata.email || "N/A"}</span>
                  </label>
                </div>
                <div className="bg-gray-950 p-4 rounded-md">
                  <label className="block text-gray-50">
                    <strong>DOB:</strong>
                    <span className="block">{formattedDOB}</span>
                  </label>
                </div>
                <div className="bg-gray-950 p-4 rounded-md">
                  <label className="block text-gray-50">
                    <strong>Address:</strong>
                    <span className="block">{userdata.address || "N/A"}</span>
                  </label>
                </div>
                <div className="bg-gray-950 p-4 rounded-md">
                  <label className="block text-gray-50">
                    <strong>Role:</strong>
                    <span className="block">{userdata.role || "N/A"}</span>
                  </label>
                </div>
              </form>
            </div>
          </div>

          <div className="md:w-1/2 p-6 flex flex-col justify-center relative">
            <div className="w-full">
              {/* Centered Message and Button for My Bookings */}
              {activeToggle === "bookings" && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-lg mb-2">
                    To see your appointments, click on this button.
                  </div>
                  <Link to="/mybooking">
                    <button className="p-3 rounded-full text-white bg-gray-600 hover:bg-gray-700 transition duration-300">
                      See All Appointments
                    </button>
                  </Link>
                </div>
              )}
              {activeToggle === "settings" && (
                <Profile userdata={userdata} />
              )}{" "}
              {/* Pass userdata as props */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
