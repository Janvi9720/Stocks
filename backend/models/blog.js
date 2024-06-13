import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: false,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});


let Blog = mongoose.model('Blog', blogSchema);

export default Blog;