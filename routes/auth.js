import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

// Register user

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Error all fields must be filled" });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({ message: "Error creating user failed" });
    }

    const isMatch = await User.findOne({ email });

    if (isMatch) {
      return res.status(400).json({ message: "Error user already exists" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ user: { id: user.id, username, email }, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Login user

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Error all fields must be filled" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Error user not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Error wrong password input" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({ user: { id: user.id, username, email }, token });
});

export default router;
