import express from "express";
import connectDB from "./db.js";
import postRouter from "./routes/posts.js";
import userRouter from "./routes/auth.js";
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use("/posts", postRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my server");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
