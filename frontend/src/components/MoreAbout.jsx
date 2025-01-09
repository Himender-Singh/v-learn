import React from 'react';
import img from '../assets/Subscribe.png'; // Update the path if necessary
import WhatWeOffer from './WhatWeOffer'; // Import the new component

const MoreAbout = () => {
  return (
    <div className="container max-w-screen-xl mt-10 mx-auto p-8">
      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center mb-12">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img src={img} alt="About Us" className="w-80 md:w-96 h-auto rounded-lg shadow-md" />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">About Us</h2>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to our platform! We’re committed to bringing high-quality training directly to your home. From yoga and fitness to cooking and coding, we empower individuals to learn and grow.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Our platform connects you with expert trainers who provide personalized guidance tailored to your needs. Whether you’re looking to enhance your skills or learn something entirely new, we’ve got you covered.
          </p>
          <p className="text-lg text-gray-700">
            Together, we create a world where learning is accessible, enjoyable, and impactful. Join us to begin your journey toward mastery!
          </p>
          <button className="mt-6 py-4 px-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full hover:opacity-90 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* What We Offer Section */}
      <WhatWeOffer />
    </div>
  );
};

export default MoreAbout;
