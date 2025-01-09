import React from "react";
import { HashLoader, ScaleLoader } from "react-spinners";

const Loader = ({ showLoader }) => {
  return (
    <div className="flex z-50 flex-col w-full fixed h-screen bg-black bg-opacity-90 inset-0 items-center justify-center">
      <ScaleLoader color="#4A90E2" loading={showLoader} size={50} />
      <p className="text-lg text-gray-200 mt-2">Loading...</p>
      <p className="text-sm text-gray-300 mt-1">
        Timestamp: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
};

export default Loader;
