import express from "express";
import multer from "multer";
import path from "path";
import {
  getBlogs,
  getBlogById,
  createBlog,
  removeBlog,
  updateBlog
} from "../controllers/blogs.js";
import { jwtCheck, jwtParse} from "../middleware/auth.js";

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\s+/g, "-"));
  },
});

const upload = multer({ storage: storage });

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", jwtCheck, jwtParse, upload.single("media"), createBlog);
router.put("/:id", jwtCheck, jwtParse, upload.single("media"), updateBlog);
router.delete("/:id", jwtCheck, jwtParse, removeBlog);


export default router;
