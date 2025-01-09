import Booking from "../modles/BookingSchema.js";
import Trainer from "../modles/TrainerSchema.js";
import User from "../modles/UserSchema.js";
import Stripe from "stripe";

export const getCheckoutSession = async (req, res) => {
  try {
    // Check if userId exists
    if (!req.userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing from the request.",
      });
    }

    // Fetch trainer and user details
    const trainer = await Trainer.findById(req.params.trainerId);
    const user = await User.findById(req.userId);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found.",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SIDE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/trainer/${trainer._id}`,
      customer_email: user.email,
      client_reference_id: req.params.trainerId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: trainer.ticketPrice * 100,
            product_data: {
              name: trainer.name,
              description: trainer.bio,
              images: [trainer.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    // Save booking details
    const booking = new Booking({
      trainer: trainer._id,
      user: user._id,
      ticketPrice: trainer.ticketPrice,
      session: session.id,
    });

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment session created successfully.",
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating checkout session.",
    });
  }
};
