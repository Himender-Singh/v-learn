import React from "react";
import img from "../assets/hero.png"; // Update the path if necessary
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-gradient-to-l from-gray-800 to-red-800 py-12"> {/* Night effect gradient with padding */}
      <div className="flex flex-col  md:h-[40rem] mb-4 container max-w-screen-xl mx-auto md:flex-row items-center justify-between px-6"> {/* Adjusted padding */}
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-left mr-8 mb-8 md:mb-0">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-4">
            We help trainees gain driving confidence.
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Discover a world of knowledge and skills with our expert trainers.
            Join us today and take the first step towards your learning journey!
          </p>
          {
            <Link to={'/mybooking'} >
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300">
            Request an Appointment
          </button>
          </Link>
          }

          {/* Statistics Section */}
          <div className="flex text-white gap-6 mt-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl border-b-4 border-yellow-300 font-bold mb-1">
                100+
              </span>
              <span className="text-gray-300">Customers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl border-b-4 border-violet-600 font-bold mb-1">
                100%
              </span>
              <span className="text-gray-300">Satisfaction</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl border-b-4 border-green-500 font-bold mb-1">
                50+
              </span>
              <span className="text-gray-300">Trainers</span>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={img}
            alt="Learning Animation"
            className="w-80 md:w-96 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
