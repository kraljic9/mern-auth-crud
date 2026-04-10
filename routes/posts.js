import express from "express";
import mongoose from "mongoose";
import Post from "../models/post.js";

const router = express.Router();

// Get posts

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// Get individual post

// Add new post

// Eddit post

// Delete post

export default router;
