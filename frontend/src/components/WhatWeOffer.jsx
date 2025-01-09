import React from 'react';
import { FaCar, FaUtensils, FaSpa, FaDumbbell, FaBrush, FaLaptopCode } from 'react-icons/fa';

const features = [
  {
    title: "Yoga",
    description: "Achieve peace and flexibility with guided yoga sessions from expert instructors.",
    icon: <FaSpa className="text-5xl text-blue-500" />,
  },
  {
    title: "Driving",
    description: "Master the art of driving with professional and experienced trainers.",
    icon: <FaCar className="text-5xl text-red-500" />,
  },
  {
    title: "Cooking",
    description: "Learn to cook delicious and healthy meals from top chefs around the world.",
    icon: <FaUtensils className="text-5xl text-green-500" />,
  },
  {
    title: "Fitness",
    description: "Stay fit and active with personalized at-home workout plans.",
    icon: <FaDumbbell className="text-5xl text-yellow-500" />,
  },
  {
    title: "Art & Craft",
    description: "Explore your creative side with fun and engaging art & craft activities.",
    icon: <FaBrush className="text-5xl text-purple-500" />,
  },
  {
    title: "Coding",
    description: "Build your tech skills with beginner to advanced coding tutorials.",
    icon: <FaLaptopCode className="text-5xl text-teal-500" />,
  },
];

const WhatWeOffer = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 py-12">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-gray-800">What We Offer</h3>
        <p className="text-lg text-gray-600 mt-4">
          Discover a variety of skills and activities you can master from the comfort of your home.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h4>
            <p className="text-gray-600 text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;
