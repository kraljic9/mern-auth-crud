import express from "express";
import Post from "../models/post.js";
import auth from "../middleware/auth.js";
import { postSchema } from "../validation/postSchema.js";
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

router.get("/:id", auth, async (req, res) => {
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

router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = postSchema.parse(req.body);

    const newPost = await Post.create({
      title,
      content,
      author: req.user,
    });

    res.status(201).json({ message: "Post created succesfully", newPost });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// Eddit post

router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Error accured fill in fields please" });
    }

    const id = req.params.id;

    const post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      { new: true },
    );

    if (!post) {
      return res
        .status(404)
        .json({ message: `Error accured post with id ${id} was not found` });
    }

    res.status(200).json({ message: "Post eddit succes", post });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// Delete post

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res
        .status(404)
        .json({ message: `Error accured post with id ${id} was not found` });
    }

    res.status(200).json({ message: "Post deleted succes", post });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

export default router;
