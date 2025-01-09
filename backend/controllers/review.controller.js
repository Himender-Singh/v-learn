import User from "../modles/UserSchema.js";
import Trainer from "../modles/TrainerSchema.js";
import Review from "../modles/ReviewSchema.js";

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})
            .populate('user', 'name photo') // This should work if user exists
            .exec();
        
        
        res.status(200).json({
            message: "Successfully retrieved",
            data: reviews,
            success: true,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(404).json({
            message: "Could not retrieve reviews",
            success: false,
        });
    }
};

export const createReview = async (req, res) => {
    // Ensure req.user is set by the authenticate middleware
    if (!req.body.trainer) req.body.trainer = req.params.trainerId;
    if (!req.body.user) req.body.user = req.user._id; // Use req.user set by the authenticate middleware


    // Validate rating and reviewText
    if (!req.body.rating || !req.body.reviewText) {
        return res.status(400).json({
            success: false,
            message: "Rating and review text are required.",
        });
    }

    // Create a new review
    const newReview = new Review(req.body);

    try {
        // Save the new review
        const savedReview = await newReview.save();

        // Update the trainer document with the new review
        await Trainer.findByIdAndUpdate(req.body.trainer, {
            $push: { reviews: savedReview._id },
        });

        // Send success response
        res.status(200).json({
            success: true,
            message: "Review submitted successfully",
            data: savedReview,
        });
    } catch (error) {
        // Log the error for debugging
        console.error(error);

        // Send error response
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred while submitting the review.",
        });
    }
};


