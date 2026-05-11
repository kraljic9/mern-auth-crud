import express from "express";
import auth from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const { content, postId } = req.body;

    const comment = await Comment.create({
      content,
      post: postId,
      auth: req.user,
    });

    res.status(201).json(comment);
  }),
);

export default router;
