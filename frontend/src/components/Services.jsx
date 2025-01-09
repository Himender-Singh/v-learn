import React from "react";
import { FaCalendarAlt, FaSearch, FaGlobe } from "react-icons/fa"; // Importing icons for each service
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="container max-w-screen-xl mx-auto sm:py-0 md:py-28">
      <section className="flex items-center font-semibold flex-col justify-center mt-56 lg:mt-0">
        <span className="text-5xl text-center">
          Dedicated to Providing Superior
        </span>
        <span className="text-5xl text-center mt-4">
          Services for Our Clients
        </span>
        <p className="text-lg text-center text-gray-500 mt-2">
          Our mission is to empower learners with the confidence and skills they
          need to succeed.
        </p>
      </section>

      <section className="flex flex-col md:flex-row mt-10 font-semibold justify-center items-start gap-10">
        <div className="flex flex-col items-center w-full md:w-1/3">
          <img src={img1} className="w-64 h-auto" alt="Book an Appointment" />
          <p className="text-2xl font-semibold text-center mt-2">
            Book an Appointment
          </p>
          <span className="text-center text-md text-gray-600 mb-4">
            Schedule a session with our expert trainers for personalized
            guidance.
          </span>
          <Link to={'/trainers'}>
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full flex items-center">
              <FaCalendarAlt className="mr-2" />
              Book Appointment
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center w-full md:w-1/3">
          <img
            src={img2}
            className="w-64 h-auto"
            alt="Search the Best Suited Trainer"
          />
          <p className="text-2xl font-semibold text-center mt-2">
            Search the Best Suited Trainer
          </p>
          <span className="text-center text-md text-gray-600 mb-4">
            Find the perfect trainer tailored to your needs and learning style.
          </span>
          <Link>
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full flex items-center">
              <FaSearch className="mr-2" />
              Search Trainer
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center w-full md:w-1/3">
          <img
            src={img3}
            className="w-64 h-auto"
            alt="Connect Yourself Worldwide"
          />
          <p className="text-2xl font-semibold text-center mt-2">
            Connect Yourself Worldwide
          </p>
          <span className="text-center text-md text-gray-600 mb-4">
            Join a global community of learners and trainers to share
            experiences.
          </span>
          <Link>
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full flex items-center">
              <FaGlobe className="mr-2" />
              Connect Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
