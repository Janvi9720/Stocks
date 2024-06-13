import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let contentDecoded;

    if (token && isCustomAuth) {
      contentDecoded = jwt.verify(token, jwtSecret);
      req.userId = contentDecoded?.id;
    } else {
      contentDecoded = jwt.decode(token);
      req.userId = contentDecoded?.sub;
    }
    if (req.path === "/user/userlist") {
      const user = await User.findById(req.userId);
      if (user && user.userType === "admin") {
        next();
      } else {
        res.status(403).json({ message: "You are not authorized to access this resource" });
      }
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({ message: "Not authenticated!" });
  }
};

export default auth;
