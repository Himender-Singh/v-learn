import React, { useEffect, useState } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineDollar,
  AiOutlineFileDone,
  AiOutlineInfoCircle,
  AiOutlinePlus,
  AiOutlineDelete,
} from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";

const Profile = ({ trainerData }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    photo: "",
    ticketPrice: "",
    role: "",
    address: "",
    driving_licence: "", // Identity proof field
    specialization: "",
    qualifications: [],
    experiences: [],
    bio: "",
    about: "",
    timeSlots: [],
    gender: "",
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedLicence, setSelectedLicence] = useState(null); // State for driving licence
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (trainerData) {
      setFormData({
        email: trainerData.email,
        name: trainerData.name,
        phone: trainerData.phone,
        photo: trainerData.photo,
        ticketPrice: trainerData.ticketPrice,
        role: trainerData.role,
        address: trainerData.address,
        driving_licence: trainerData.driving_licence, // Populate driving licence from trainerData
        specialization: trainerData.specialization,
        qualifications: trainerData.qualifications || [],
        experiences: trainerData.experiences || [],
        bio: trainerData.bio,
        about: trainerData.about,
        timeSlots: trainerData.timeSlots || [],
      });
    }
  }, [trainerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const data = await uploadImageToCloudinary(file);
        if (type === "photo") {
          setSelectedPhoto(data.secure_url);
          setFormData((prevData) => ({ ...prevData, photo: data.secure_url }));
        } else if (type === "driving_licence") {
          setSelectedLicence(data.secure_url);
          setFormData((prevData) => ({
            ...prevData,
            driving_licence: data.secure_url,
          }));
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/trainer/${trainerData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }

      toast.success("Profile updated successfully!");
      setFormData({
        email: "",
        name: "",
        phone: "",
        photo: "",
        ticketPrice: "",
        role: "",
        address: "",
        driving_licence: "", // Reset driving licence
        specialization: "",
        qualifications: [],
        experiences: [],
        bio: "",
        about: "",
        timeSlots: [],
        gender: "",
      });
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addQualification = () => {
    setFormData({
      ...formData,
      qualifications: [
        ...formData.qualifications,
        { startDate: "", endDate: "", from: "" },
      ],
    });
  };

  const deleteQualification = (index) => {
    const newQualifications = formData.qualifications.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, qualifications: newQualifications });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { startDate: "", endDate: "", position: "" },
      ],
    });
  };

  const deleteExperience = (index) => {
    const newExperiences = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: newExperiences });
  };

  const addTimeSlots = () => {
    setFormData({
      ...formData,
      timeSlots: [
        ...formData.timeSlots,
        { startingTime: "", endingTime: "", day: "" },
      ], // Updated keys
    });
  };

  const deleteTimeSlots = (index) => {
    // Corrected function name
    const newTimeSlots = formData.timeSlots.filter((_, i) => i !== index);
    setFormData({ ...formData, timeSlots: newTimeSlots });
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8 border border-gray-300 rounded-lg shadow-md bg-white overflow-hidden scrollbar-hide">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center mb-5 text-gray-800">
        Trainer Profile Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <div className="flex items-center border-b border-gray-400 py-2">
            <AiOutlineMail className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="focus:outline-none focus:ring-2 focus:ring-red-500 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <div className="flex items-center border-b border-gray-400 py-2">
            <AiOutlineUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="focus:outline-none focus:ring-2 focus:ring-red-500 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone:</label>
          <div className="flex items-center border-b border-gray-400 py-2">
            <AiOutlinePhone className="text-gray-500 mr-2" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="focus:outline-none focus:ring-2 focus:ring-red-500 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address:</label>
          <div className="flex items-center border-b border-gray-400 py-2">
            <AiOutlineHome className="text-gray-500 mr-2" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="focus:outline-none focus:ring-2 focus:ring-red-500 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
              placeholder="Enter your address"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload Photo:</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "photo")}
            className="focus:outline-none focus:ring-2 focus:ring-red-500 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Upload Licence or Identity:
          </label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "driving_licence")} // Update to use new function
            className="focus:outline-none focus:ring-2 focus:ring-red-500 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
          />
        </div>

        {/* ticket price */}
        <div className="mb-4 flex items-center">
          <div className="w-1/2 pr-2">
            <label className="block text-gray-700">Ticket Price:</label>
            <div className="flex items-center border-b border-gray-400 py-2">
              <AiOutlineDollar className="text-gray-500 mr-2" />
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleChange}
                required
                className="focus:outline-none focus:ring-2 focus:ring-red-500 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
                placeholder="Enter ticket price"
              />
            </div>
          </div>

          {/* specialization in field */}
          <div className="w-1/2 pl-2">
            <label className="block text-gray-700">Specialization:</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="focus:outline-none border-b-2 border-red-600 focus:ring-2 focus:ring-red-500 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
            >
              <option value="">Select Specialization</option>
              <option value="Car Driving Classes">Car Driving Classes</option>
              <option value="Scotty Driving Classes">
                Scotty Driving Classes
              </option>
              <option value="Fitness Training">Fitness Training</option>
              <option value="Dance Classes">Dance Classes</option>
              <option value="Music Lessons">Music Lessons</option>
              <option value="Cooking Classes">Cooking Classes</option>
              <option value="Yoga Sessions">Yoga Sessions</option>
              <option value="Art Classes">Art Classes</option>
              <option value="Language Lessons">Language Lessons</option>
              <option value="Photography Workshops">
                Photography Workshops
              </option>
            </select>
          </div>
        </div>

        {/* bio section */}
        <div className="mb-4">
          <label className="block text-gray-700">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            required
            className="focus:outline-none ring-1 ring-gray-300 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
            placeholder="Enter a short bio"
          ></textarea>
        </div>

        {/* about section */}
        <div className="mb-4">
          <label className="block text-gray-700">About:</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
            required
            className="focus:outline-none ring-1 ring-gray-300 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
            placeholder="Tell us more about yourself"
          ></textarea>
        </div>

        {/* qualidication */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Qualifications</h3>
          {formData.qualifications.map((qualification, index) => (
            <div key={index} className="border rounded-md p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">From:</label>
                  <input
                    type="text"
                    name="from"
                    value={qualification.from}
                    onChange={(e) => {
                      const newQualifications = [...formData.qualifications];
                      newQualifications[index].from = e.target.value;
                      setFormData({
                        ...formData,
                        qualifications: newQualifications,
                      });
                    }}
                    className="focus:outline-none ring-1 ring-gray-300 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    value={qualification.startDate}
                    onChange={(e) => {
                      const newQualifications = [...formData.qualifications];
                      newQualifications[index].startDate = e.target.value;
                      setFormData({
                        ...formData,
                        qualifications: newQualifications,
                      });
                    }}
                    className="focus:outline-none ring-1 ring-gray-300 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    value={qualification.endDate}
                    onChange={(e) => {
                      const newQualifications = [...formData.qualifications];
                      newQualifications[index].endDate = e.target.value;
                      setFormData({
                        ...formData,
                        qualifications: newQualifications,
                      });
                    }}
                    className="focus:outline-none ring-1 ring-gray-300 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => deleteQualification(index)}
                className="mt-2 text-red-600 hover:text-red-800"
              >
                <AiOutlineDelete /> Remove Qualification
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addQualification}
            className="flex items-center text-green-600 hover:text-green-800"
          >
            <AiOutlinePlus className="mr-1" /> Add Qualification
          </button>
        </div>

        {/* experience */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Experiences</h3>
          {formData.experiences.map((experience, index) => (
            <div key={index} className="border rounded-md p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Position:</label>
                  <input
                    type="text"
                    name="position"
                    value={experience.position}
                    onChange={(e) => {
                      const newExperiences = [...formData.experiences];
                      newExperiences[index].position = e.target.value;
                      setFormData({ ...formData, experiences: newExperiences });
                    }}
                    className="focus:outline-none ring-1 ring-gray-300 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    value={experience.startDate}
                    onChange={(e) => {
                      const newExperiences = [...formData.experiences];
                      newExperiences[index].startDate = e.target.value;
                      setFormData({ ...formData, experiences: newExperiences });
                    }}
                    className="focus:outline-none ring-1 ring-gray-300 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    value={experience.endDate}
                    onChange={(e) => {
                      const newExperiences = [...formData.experiences];
                      newExperiences[index].endDate = e.target.value;
                      setFormData({ ...formData, experiences: newExperiences });
                    }}
                    className="focus:outline-none ring-1 ring-gray-300 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => deleteExperience(index)}
                className="mt-2 text-red-600 hover:text-red-800"
              >
                <AiOutlineDelete /> Remove Experience
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="flex items-center text-green-600 hover:text-green-800"
          >
            <AiOutlinePlus className="mr-1" /> Add Experience
          </button>
        </div>

        {/* time slots */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Time Slots</h3>
          {formData.timeSlots.map((timeSlot, index) => (
            <div key={index} className="border rounded-md p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Day:</label>
                  <input
                    type="text"
                    name="day"
                    value={timeSlot.day} // Updated to match the new object property
                    onChange={(e) => {
                      const newTimeSlots = [...formData.timeSlots];
                      newTimeSlots[index].day = e.target.value; // Updated to match the new object property
                      setFormData({ ...formData, timeSlots: newTimeSlots });
                    }}
                    className="focus:outline-none ring-1 ring-gray-300 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Starting Time:</label>
                  <input
                    type="time" // Updated to 'time' for time input
                    name="startingTime"
                    value={timeSlot.startingTime} // Updated to match the new object property
                    onChange={(e) => {
                      const newTimeSlots = [...formData.timeSlots];
                      newTimeSlots[index].startingTime = e.target.value; // Updated to match the new object property
                      setFormData({ ...formData, timeSlots: newTimeSlots });
                    }}
                    className="focus:outline-none ring-1 ring-gray-300 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Ending Time:</label>
                  <input
                    type="time" // Updated to 'time' for time input
                    name="endingTime"
                    value={timeSlot.endingTime} // Updated to match the new object property
                    onChange={(e) => {
                      const newTimeSlots = [...formData.timeSlots];
                      newTimeSlots[index].endingTime = e.target.value; // Updated to match the new object property
                      setFormData({ ...formData, timeSlots: newTimeSlots });
                    }}
                    className="focus:outline-none ring-1 ring-gray-300 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => deleteTimeSlots(index)} // Corrected function name
                className="mt-2 text-red-600 hover:text-red-800"
              >
                <AiOutlineDelete /> Remove timeSlot
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTimeSlots} // Corrected function name
            className="flex items-center text-green-600 hover:text-green-800"
          >
            <AiOutlinePlus className="mr-1" /> Add timeSlot
          </button>
        </div>

        {/* gender */}
        <div className="mb-4">
          <label className="block text-gray-700">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="focus:outline-none border-b-2 border-red-600 focus:ring-2 focus:ring-red-500 w-full py-1 px-2 rounded-lg transition duration-200 ease-in-out"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 ease-in-out"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
