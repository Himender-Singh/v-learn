import Booking from "../modles/BookingSchema.js";
import Trainer from "../modles/TrainerSchema.js";
import User from "../modles/UserSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully updated",
      success: true,
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to update",
      success: false,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "Successfully deleted",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to delete",
      success: false,
    });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({
      message: "user found",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "no user found",
      success: false,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find({}).select("-password");

    res.status(200).json({
      message: "user found",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "user not found",
      success: false,
    });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  // If userId is not set, return an error early
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No userId found",
    });
  }

  try {
    const user = await User.findById(userId);

    // Log the result of the database query
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Exclude the password field
    const { password, ...rest } = user._doc; // `rest` will include all other fields, including phone

    res.status(200).json({
      success: true,
      message: "Profile info retrieved successfully",
      data: { ...rest }, // This will include the phone field
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving profile info",
    });
  }
};




export const getMyAppointments = async(req,res) => {
  try {
    const bookings = await Booking.find({user:req.userId})

    const trainerId = bookings.map(el=>el.trainer.id)

    const trainers = await Trainer.find({_id:{$in:trainerId}}).select('-password')

    res.status(200).json({
      success:true,
      message:"Appointement are getting",
      data:trainers
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
}
