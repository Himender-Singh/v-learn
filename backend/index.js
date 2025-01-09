import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import trainerRouter from "./routers/trainerRouter.js";
import reviewRouter from "./routers/reviewRouter.js";
import bookingRouter from "./routers/bookingRouter.js";
import contactRouter from "./routers/contactRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
  origin: ["http://localhost:5173" || "http://localhost:5174"],
  origin: true,
};


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB connected successfully to ${mongoose.connection.db.databaseName}`
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};
 
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

// all routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/trainer',trainerRouter)
app.use('/api/v1/reviews',reviewRouter)
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/user',contactRouter)

app.listen(port, () => {
  console.log(`server is runing on port ${port}`);
  connectDB();
});
