import Trainer from "../modles/TrainerSchema.js";
import User from "../modles/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = user => {
    return jwt.sign({id:user._id , role:user.role},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
}

// register a user according to it's role
export const register = async (req, res) => {
  const { name, email, password, role, gender, photo } = req.body;
  try {
    let user = null;
    if (role === "trainee") {
      user = await User.findOne({ email });
    } else if (role == "trainer") {
      user = await Trainer.findOne({ email });
    }

    if (user) {
      return res.status(400).json({
        message: "user already exist",
        status: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "trainee") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    } else if (role == "trainer") {
      user = new Trainer({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();

    res.status(200).json({
      message: "user created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

// login the user
// login the user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;

    const trainee = await User.findOne({ email });
    const trainer = await Trainer.findOne({ email });

    if (trainee) {
      user = trainee;
    }
    if (trainer) {
      user = trainer;
    }

    if (!user) {
      return res.status(404).json({
        message: "user does not exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    // generate authentication using middleware
    const token = generateToken(user);

    const { password, role, appointments, phone, ...rest } = user._doc; // Include phone here

    res.status(200).json({
      status: true,
      message: "successfully login",
      token,
      data: { ...rest, phone }, // Include phone in the response data
      role,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

