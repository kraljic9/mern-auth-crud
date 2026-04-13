import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ message: "Error no token" });
  }

  const token = header.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.id;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default auth;
