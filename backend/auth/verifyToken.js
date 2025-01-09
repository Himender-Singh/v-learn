import jwt from "jsonwebtoken";
import Trainer from "../modles/TrainerSchema.js";
import User from "../modles/UserSchema.js";

// Authentication Middleware
export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  // Check if the token is provided and starts with "Bearer"
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }

  try {
    // Extract the token from the header
    const token = authToken.split(" ")[1];
    
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Set userId and role from the decoded token
    req.userId = decoded.id; // Ensure this matches the field in the token
    req.role = decoded.role;

    // Optionally, find the user in the database and attach it to the request
    if (decoded.role === "trainer") {
      req.user = await Trainer.findById(req.userId).select("-password");
    } else if (decoded.role === "trainee") {
      req.user = await User.findById(req.userId).select("-password");
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token, authorization denied",
    });
  }
};

// Role Restriction Middleware
export const restrict = (roles) => async (req, res, next) => {
  try {
    const userId = req.userId; 

    // Ensure userId is present
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: No userId found",
        success: false,
      });
    }

    // Determine user type and fetch from the database
    let user;
    if (req.role === "trainer") {
      user = await Trainer.findById(userId).select("-password");
    } else if (req.role === "trainee") {
      user = await User.findById(userId).select("-password");
    }

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Check if user has the correct role
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: "Not authorized",
        success: false,
      });
    }

    // Attach user object to request for further use
    req.user = user; // This could be useful in later middleware or route handlers

    next();
  } catch (error) {
    console.error("Error in restrict middleware:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while checking user role",
    });
  }
};