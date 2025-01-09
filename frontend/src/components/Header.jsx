import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo1.png";
import { authContext } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, dispatch } = useContext(authContext); // Include dispatch from context
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isLoggedIn = !!user;

  const profileLink =
    role === "trainer" ? "/trainers/profile/me" : "/users/profile/me";

  return (
    <div className="w-full sticky z-50 top-0 bg-gradient-to-r from-red-800 to-gray-900">
      <header className=" container max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
        <h1 className="md:text-4xl text-2xl font-extrabold tracking-wide text-white relative">
              <span
                className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
                style={{
                  textShadow: `
        2px 2px 0px #cfbaf0,  /* Red shadow */
        4px 4px 0px #ff0000,  /* Green shadow */
        6px 6px 0px #023047   /* Blue shadow */
      `,
                }}
              >
                V
              </span>
              -Learn
            </h1>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8 mb-4 sm:mb-0">
          <Link
            to="/"
            className="text-gray-100 font-medium hover:border-b-2 hover:border-blue-500 hover:text-blue-500 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/trainers"
            className="text-gray-100 font-medium hover:border-b-2 hover:border-blue-500 hover:text-blue-500 transition duration-300"
          >
            Find a Trainer
          </Link>
          <Link
            to="/blogs"
            className="text-gray-100 font-medium hover:border-b-2 hover:border-blue-500 hover:text-blue-500 transition duration-300"
          >
            Blogs
          </Link>
          <Link
            to="/contact"
            className="text-gray-100 font-medium hover:border-b-2 hover:border-blue-500 hover:text-blue-500 transition duration-300"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="text-gray-100 font-medium hover:border-b-2 hover:border-blue-500 hover:text-blue-500 transition duration-300"
          >
            About
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-red-800 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } sm:hidden`}
        >
          <div className="flex flex-col p-4">
            <button className="self-end mb-4" onClick={toggleMenu}>
              <FaTimes className="w-6 h-6 text-gray-100" />
            </button>
            <nav className="flex flex-col space-y-4">
              <Link
                onClick={toggleMenu}
                to="/"
                className="text-gray-100 font-medium hover:border-b-2 hover:border-blue-500 hover:text-blue-500 transition duration-300"
              >
                Home
              </Link>
              <Link
                onClick={toggleMenu}
                to="/trainers"
                className="text-gray-100 font-medium hover:border-b-2 hover:border-blue-500 hover:text-blue-500 transition duration-300"
              >
                Find a Trainer
              </Link>
              <Link
                onClick={toggleMenu}
                to="/mybooking"
                className="text-gray-100 font-medium hover:border-b-2 hover:border-blue-500 hover:text-blue-500 transition duration-300"
              >
                Book
              </Link>
              <Link
                onClick={toggleMenu}
                to="/contact"
                className="text-gray-100 font-medium hover:border-b-2 hover:border-blue-500 hover:text-blue-500 transition duration-300"
              >
                Contact
              </Link>
              <Link
                onClick={toggleMenu}
                to="/about"
                className="text-gray-100 font-medium hover:border-b-2 hover:border-blue-500 hover:text-blue-500 transition duration-300"
              >
                About
              </Link>
            </nav>
          </div>
        </div>

        {/* Login/Signup or Profile */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to={profileLink}
                className="flex items-center space-x-2 text-gray-100 hover:text-blue-500 transition duration-300"
              >
                {/* <img src={user.photo} alt={user.name} className="h-8 border border-black w-8 rounded-full" /> User Image */}
                <span className="font-semibold p-2 bg-white text-black hover:bg-black hover:text-white rounded-full capitalize">
                  {user.name}
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-full shadow-md hover:bg-gray-300 transition duration-300"
              >
                Login
              </Link>
            </>
          )}

          {/* Hamburger Icon */}
          <button className="md:hidden flex items-center" onClick={toggleMenu}>
            <FaBars className="w-6 h-6 text-gray-100" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
