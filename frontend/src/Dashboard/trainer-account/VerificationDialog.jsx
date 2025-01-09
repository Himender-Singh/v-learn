import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const VerificationDialog = ({ isOpen, onRequestClose, trainerData }) => {
  const [otp, setOtp] = useState("");
  const [idDocument, setIdDocument] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    photo: "",
    ticketPrice: "",
    role: "",
    address: "",
    specialization: "",
    qualifications: [],
    experiences: [],
    bio: "",
    about: "",
    timeSlots: [],
    gender: "",
  });

  useEffect(() => {
    if (trainerData) {
      setFormData({
        name: trainerData.name,
        phone: trainerData.phone,
        photo: trainerData.photo,
        ticketPrice: trainerData.ticketPrice,
        role: trainerData.role,
        address: trainerData.address,
        specialization: trainerData.specialization,
        qualifications: trainerData.qualifications || [],
        experiences: trainerData.experiences || [],
        bio: trainerData.bio,
        about: trainerData.about,
        timeSlots: trainerData.timeSlots || [],
      });
    }
  }, [trainerData]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (trainerData?.email) {
      try {
        const res = await fetch(`${BASE_URL}/otp/send-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: trainerData.email }),
        });

        if (!res.ok) {
          const errorMessage = await res.text(); // Get the error message
          throw new Error(errorMessage); // Throw a new error with the message
        }

        toast.success("OTP sent to your email!");
        setStep(2);
      } catch (error) {
        console.error("Error sending OTP:", error);
        toast.error("Failed to send OTP. Please try again.");
      }
    } else {
      toast.error("Email is not available.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp) {
      try {
        const res = await fetch(`${BASE_URL}/otp/verify-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: trainerData.email, otp }),
        });

        if (!res.ok) {
          const errorMessage = await res.text(); // Get the response body
          throw new Error(errorMessage); // Use the error message
        }

        const responseData = await res.json();
        toast.success("OTP verified successfully!");
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast.error(`Invalid OTP. ${error.message}`);
      }
    }
  };

  const handleIdUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("idDocument", idDocument);

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/trainer/${trainerData._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure 'token' is defined in your context
        },
        body: formData,
      });

      if (!res.ok) {
        const errorMessage = await res.text(); // Get the response body
        throw new Error(errorMessage); // Use the error message
      }

      const responseData = await res.json();
      toast.success("ID document uploaded successfully!");
      onRequestClose(); // Close the dialog after successful upload
    } catch (error) {
      console.error("Error during ID document upload:", error);
      toast.error(`ID document upload failed. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Verification</h2>
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email:</label>
              <input
                type="email"
                value={trainerData?.email || ""}
                readOnly
                className="mt-1 p-2 border text-black border-gray-300 rounded w-full bg-gray-100"
              />
              {!trainerData?.email && (
                <p className="text-red-500 text-sm">Email not available</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Send OTP
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Verify OTP
            </button>
            <div>
              <label className="block text-sm font-medium">Upload ID Document:</label>
              <input
                type="file"
                onChange={(e) => setIdDocument(e.target.files[0])}
                required
                className="mt-1 border border-gray-300 rounded w-full p-2"
              />
            </div>
            <button
              onClick={handleIdUpload}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Document"}
            </button>
          </form>
        )}
        <button
          onClick={onRequestClose}
          className="mt-4 w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default VerificationDialog;
