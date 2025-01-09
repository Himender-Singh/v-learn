import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from React Router
import ShareModal from './ShareModal'; // Import the ShareModal component

const Footer = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // State to manage modal visibility

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 py-10">
      <div className="container max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Logo and Social Media Section */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-extrabold tracking-wide text-white relative">
            <span
              className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              style={{
                textShadow: `
                  2px 2px 6px rgba(0, 0, 0, 0.5)
                `,
              }}
            >
              V
            </span>
            <span className="text-white">-Learn</span>
          </h1>
          <p className="mt-4 text-sm text-gray-400">
            Empowering learning and training experiences globally.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-300"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition duration-300"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-400 transition duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-400 transition duration-300"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="hover:text-yellow-400 transition duration-300"
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        {/* I Want To and Support Us Sections */}
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-white mb-4">I Want To</h2>
          <ul className="space-y-2 mb-6">
            <li>
              <Link
                to="/trainers"
                className="hover:text-yellow-400 transition duration-300"
              >
                Find a Trainer
              </Link>
            </li>
            <li>
              <Link
                to="/trainers"
                className="hover:text-yellow-400 transition duration-300"
              >
                Request an Appointment
              </Link>
            </li>
            <li>
              <Link
                to="/trainers"
                className="hover:text-yellow-400 transition duration-300"
              >
                Smart Search
              </Link>
            </li>
            <li>
              <Link
                to="/trainers"
                className="hover:text-yellow-400 transition duration-300"
              >
                Book
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-white mb-4">Support Us</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-400 transition duration-300"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <button
                onClick={openShareModal} // Open the share modal on click
                className="hover:text-yellow-400 transition duration-300"
              >
                Share
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} V-Learn. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
