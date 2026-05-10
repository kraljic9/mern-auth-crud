import express from "express";
import Post from "../models/post.js";
import auth from "../middleware/auth.js";
import { postSchema } from "../validation/postSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// Get posts

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
  }),
);

// Get individual post

router.get(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const post = await Post.findById(id);

    if (!post) {
      res.status(404);
      throw new Error(`Error post ${id} does not exist`);
    }

    res.status(200).json(post);
  }),
);

// Add new post

router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const { title, content } = postSchema.parse(req.body);

    const newPost = await Post.create({
      title,
      content,
      author: req.user,
    });

    res.status(201).json({ message: "Post created succesfully", newPost });
  }),
);

// Eddit post

router.put(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const { title, content } = postSchema.parse(req.body);

    const id = req.params.id;

    const post = await Post.findById(id);

    if (!post) {
      res.status(404);
      throw new Error(`Error accured post with id ${id} was not found`);
    }

    if (post.author.toString() !== req.user) {
      res.status(404);
      throw new Error(`Error this is not your post`);
    }

    post.title = title || post.title;

    post.content = content || post.content;

    const newPost = await post.save();

    res.status(200).json({ message: "Post eddit succes", post: newPost });
  }),
);

// Delete post

router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      res.status(404);
      throw new Error(`Error accured post with id ${id} was not found`);
    }

    if (post.author.toString() !== req.user) {
      res.status(403);
      throw new Error(`Error this is not your post`);
    }

    await post.deleteOne();
    res.status(201).json({ message: "Post deleted successfully" });
  }),
);

export default router;
