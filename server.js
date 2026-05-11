import express from "express";
import connectDB from "./db.js";
import postRouter from "./routes/posts.js";
import userRouter from "./routes/auth.js";
import commentRouter from "./routes/comment.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use("/posts", postRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Welcome to my server");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
