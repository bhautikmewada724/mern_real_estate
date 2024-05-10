import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Import errorHandler if it's defined in your application
// import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    // If errorHandler is defined:
    // next(errorHandler(500, "Internal Server Error"));
    next(error); // Otherwise, pass the error to the default error handler
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next({ status: 404, message: "User not found!" });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next({ status: 401, message: "Wrong credentials!" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...userData } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ success: true, data: userData });
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  try {
    const { email, name, photo } = req.body;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (user) {
      // If the user already exists, generate a JWT token and send it in the response
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...userData } = user._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(userData);
    } else {
      // If the user does not exist, generate a random password and create a new user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const username =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        avatar: photo,
      });

      // Save the new user to the database
      await newUser.save();

      // Generate a JWT token for the new user and send it in the response
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...userData } = newUser._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(userData);
    }
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "User Has Been SignOut" });
  } catch (error) {
    next(error);
  }
};
