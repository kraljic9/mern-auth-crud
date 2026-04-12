import mongoose from "mongoose";
import express from "express";
import User from "../models/user.js";

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

    res.status(201).json({ message: `User created, welcome ${username}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
