import express from "express"
import { createReview, getAllReviews } from "../controllers/review.controller.js"
import { authenticate, restrict } from "../auth/verifyToken.js"

const reviewRouter = express.Router({mergeParams:true})

reviewRouter.route('/').get(getAllReviews).post(authenticate,restrict(['trainee']),createReview)

export default reviewRouter