import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    trainer: {
      type: mongoose.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

bookingSchema.pre(/^find/, function(next){
  this.populate('user').populate({
    path:'trainer',
    select:'name'
  })
  next()
})

export default mongoose.model("Booking", bookingSchema);