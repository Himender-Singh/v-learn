import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners"; // Import the spinner
import { authContext } from "../context/AuthContext";
import { BASE_URL } from "../config";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const result = await res.json(); // Await the JSON response

      // Update the dispatch to correctly access the user data
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.data,    // Accessing the user data from result.data
          token: result.token,   // Using the token from the response
          role: result.role,     // Accessing the role from the response
        },
      });

      console.log(result);

      toast.success("Login successful!");
      setFormData({ email: "", password: "" });
      navigate("/"); // Redirect to dashboard or desired route
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border-b border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg flex justify-center items-center"
            >
              {loading ? (
                <PulseLoader color="#fff" size={10} />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
