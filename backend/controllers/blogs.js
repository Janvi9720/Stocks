import express from "express";
import Blog from "../models/blog.js";

const router = express.Router();

// GET route to fetch all blog posts
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const blogsList = blogs.map((blog) => {
      const { _id, title, content, tag, image, create_at } = blog;
      return { _id, title, content, tag, image, create_at };
    });
    res.status(200).json(blogsList);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// GET route to fetch a single blog post by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ status: "error", message: "Blog not found!" });
    }
    const { _id, title, content, tag, image, create_at } = blog;
    res.status(200).json({ _id, title, content, tag, image, create_at });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag,
      image: req.file.filename,
      // email: req.body.email,
    });
    res.status(201).json({ blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res
        .status(404)
        .json({ status: "error", message: "Blog not found" });
    }
    res.json({ status: 200, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export default router;
