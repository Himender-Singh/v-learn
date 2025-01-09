import express from "express"
import { getCheckoutSession } from "../controllers/booking.controller.js"
import { authenticate } from "../auth/verifyToken.js"

const bookingRouter = express.Router()

bookingRouter.post('/checkout-session/:trainerId',authenticate,getCheckoutSession)

export default bookingRouter