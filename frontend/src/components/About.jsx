import React from 'react';
import img from '../assets/Subscribe.png'; // Update the path if necessary
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container max-w-screen-xl mt-10 mx-auto flex flex-col md:flex-row items-center p-8">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <img src={img} alt="About Us" className="w-80 md:w-96 h-auto" />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 text-left">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our platform! We are dedicated to helping trainees gain the skills and confidence they need to succeed in their driving journey. Our expert trainers provide personalized guidance tailored to each individual's needs.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          With a commitment to excellence, we strive to empower learners through a supportive community and a wealth of resources. Join us today and embark on your path to success!
        </p>
        <p className="text-lg text-gray-700">
          Our mission is to create a world where everyone can confidently take the wheel and navigate their own future. Together, we can achieve greatness!
        </p>

        <Link to={"/about"}>
        <button className='mt-5 py-4 px-10 border border-black hover:bg-white hover:text-black bg-black text-white rounded-full'>
            Learn More
        </button></Link>
      </div>
    </div>
  );
};

export default About;
