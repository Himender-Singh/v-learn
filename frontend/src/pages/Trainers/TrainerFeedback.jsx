import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify
import { BASE_URL, token } from "../../config";

const TrainerFeedback = ({ reviews, totalRating, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const { id } = useParams();

  const [visibleReviewsCount, setVisibleReviewsCount] = useState(3); // Number of reviews to show initially

  const handleShowMore = () => {
    setVisibleReviewsCount((prevCount) => prevCount + 3); // Increase count by 3
  };

  const handleShowLess = () => {
    setVisibleReviewsCount(3); // Reset to the initial count
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!rating || !reviewText) {
        toast.error("All fields are required!");
        return;
      }

      const res = await fetch(`${BASE_URL}/trainer/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText, user: userId }), // Include userId
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to submit feedback.");
      }

      toast.success("Feedback submitted successfully!");
      setIsModalOpen(false);
      setReviewText("");
      setRating(0);
    } catch (error) {
      toast.error(error.message || "An error occurred!");
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">
        All reviews ({totalRating || 0})
      </h3>

      <div className="space-y-4">
        {/* Feedback List */}
        {reviews.slice(0, visibleReviewsCount).map((review, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-4">
              <img
                src={review.user?.photo || "/default-user.png"}
                alt={review.user?.name || "Anonymous"}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">
                  {review.user?.name || "Anonymous"}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  {review.reviewText || "No comments"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-yellow-500">
                {"★".repeat(review.rating || 0)}
                {"☆".repeat(5 - (review.rating || 0))}
              </p>
            </div>
          </div>
        ))}

        {/* Show More / Show Less Button */}
        {visibleReviewsCount < reviews.length ? (
          <button
            onClick={handleShowMore}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Read More
          </button>
        ) : (
          visibleReviewsCount >= reviews.length && (
            <button
              onClick={handleShowLess}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Read Less
            </button>
          )
        )}
      </div>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="mt-8">
          <div className="w-full">
            <h2 className="text-lg font-semibold mb-4">
              How would you rate the overall experience?*
            </h2>

            {/* Star Rating Selection */}
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="6"
              placeholder="Write your feedback..."
              className="w-full border border-black rounded-md p-2 mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleFeedbackSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Submit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Give Feedback Button */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Give Feedback
        </button>
      </div>
    </div>
  );
};

export default TrainerFeedback;
