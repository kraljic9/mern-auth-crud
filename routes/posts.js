import express from "express";
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

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ message: `Error accured post with id ${id} was not found` });
    }

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// Add new post

// Eddit post

// Delete post

export default router;
