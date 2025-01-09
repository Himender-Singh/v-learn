import mongoose from "mongoose";
import Trainer from "./TrainerSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    trainer: {
      type: mongoose.Types.ObjectId,
      ref: "Trainer",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next()
});

reviewSchema.statics.calcAverageRatings = async function (trainerId) {
  const stats = await this.aggregate([
    {
      $match: { trainer: trainerId },
    },
    {
      $group: {
        _id: "$trainer",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await Trainer.findByIdAndUpdate(trainerId,{
    totalRating:stats[0].numOfRating,
    averageRating:stats[0].avgRating,
  })
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.trainer);
});

export default mongoose.model("Review", reviewSchema);
