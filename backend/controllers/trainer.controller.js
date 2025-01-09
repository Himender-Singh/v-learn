import Booking from "../modles/BookingSchema.js";
import Trainer from "../modles/TrainerSchema.js"; // Corrected path

export const updateTrainer = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully updated",
      success: true,
      data: updatedTrainer,
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to update: ${error.message}`,
      success: false,
    });
  }
};

export const deleteTrainer = async (req, res) => {
  const id = req.params.id;

  try {
    await Trainer.findByIdAndDelete(id);

    res.status(200).json({
      message: "Successfully deleted",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to delete: ${error.message}`,
      success: false,
    });
  }
};

export const getSingleTrainer = async (req, res) => {
  const id = req.params.id;

  try {
    const trainer = await Trainer.findById(id)
      .populate("reviews") // This will now populate using the virtual field
      .select("-password");

    if (!trainer) {
      return res.status(404).json({
        message: "Trainer not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Trainer found",
      success: true,
      data: trainer,
    });
  } catch (error) {
    res.status(500).json({
      message: `No trainer found: ${error.message}`,
      success: false,
    });
  }
};


export const getAllTrainer = async (req, res) => {
  try {
    const { query } = req.query; // Correct way to extract query parameter
    let trainer;

    if (query) {
      trainer = await Trainer.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } }, // Fix option to options
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      trainer = await Trainer.find({ isApproved: "approved" }).select("-password");
    }

    res.status(200).json({
      message: "Trainers found",
      success: true,
      data: trainer,
    });
  } catch (error) {
    res.status(500).json({
      message: `Trainers not found: ${error.message}`,
      success: false,
    });
  }
};


export const getTrainerProfile = async (req, res) => {
  const trainerId = req.userId;

  try {
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "trainer not found",
      });
    }

    const { password, ...rest } = trainer._doc;
    const appointments = await Booking.find({trainer:trainerId})

    res.status(200).json({
      success: true,
      message: "profile info is getting",
      data: { ...rest,appointments },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
