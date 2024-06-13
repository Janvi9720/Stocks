import express from "express";
import multer from "multer";
import path from "path";
import {
  getBlogs,
  getBlogById,
  createBlog,
  removeBlog,
} from "../controllers/blogs.js";

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

// router.get('/:filename', (req, res) => {
//   console.log("req", req);
//   res.sendFile(path.join('./uploads/' + req.params.filename));
// });
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", upload.single("media"), createBlog);
router.delete("/:id", removeBlog);

export default router;
