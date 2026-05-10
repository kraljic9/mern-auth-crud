import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import { userSchema } from "../validation/userSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get(
  "/me",
  auth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user).select("-password");

    res.status(200).json(user);
  }),
);

// Register user

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, password } = userSchema.parse(req.body);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("Error user already exists");
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ user: { id: user._id, username, email }, token });
  }),
);

// Login user

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Error all fields must be filled");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("Error user not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400);
      throw new Error("Error wrong password input");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({ user: { id: user._id, username: user.username, email }, token });
  }),
);

export default router;
