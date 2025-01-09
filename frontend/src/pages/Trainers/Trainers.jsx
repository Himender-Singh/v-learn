import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import TrainerCard from "./TrainerCard";
import Loader from "../../components/Loader"; // Import the Loader component

const Trainers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); // Track the current page
  const [showLoader, setShowLoader] = useState(false);
  const [loaderTimeout, setLoaderTimeout] = useState(null);
  
  const { data, loading, error } = useFetchData(
    `${BASE_URL}/trainer${searchTerm ? `?query=${searchTerm}` : ""}` // Pass page in the URL
  );

  useEffect(() => {
    if (loading) {
      setShowLoader(true);
      if (loaderTimeout) {
        clearTimeout(loaderTimeout);
      }
      const timeoutId = setTimeout(() => {
        setShowLoader(false);
      }, 500); 

      setLoaderTimeout(timeoutId); 
    } else {
      if (loaderTimeout) {
        clearTimeout(loaderTimeout);
      }
      const hideLoader = setTimeout(() => {
        setShowLoader(false);
      }, 500);
      return () => clearTimeout(hideLoader);
    }

    return () => clearTimeout(loaderTimeout);
  }, [loading]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to the first page on new search
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page to load more data
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-purple-50 via-gray-100 to-blue-50 p-6">
      {/* Search Bar */}
      <div className="top-1/4 flex items-center bg-white p-4 rounded-full shadow-lg max-w-lg w-full mb-10">
        <input
          type="text"
          placeholder="Search for trainers by name, location, or specialization..."
          value={searchTerm}
          onChange={handleSearch}
          className="flex-1 outline-none text-gray-700 px-4 py-2 rounded-full"
        />
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full hover:opacity-80 transition duration-300">
          <FaSearch className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <p className="text-lg text-red-500">
          Failed to fetch trainers. Please try again later.
        </p>
      )}

      {/* Trainers List */}
      <div className="grid grid-cols-1 capitalize md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {data?.length > 0 ? (
          data.map((trainer) => (
            <TrainerCard key={trainer._id} trainer={trainer} />
          ))
        ) : (
          <p className="text-lg text-gray-600 col-span-full text-center">
            No trainers found.
          </p>
        )}
      </div>

      {/* Load More Button */}
      {!loading && data.length > 0 && (
        <button
          onClick={loadMore}
          className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-md hover:opacity-80 transition duration-300"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Trainers;
