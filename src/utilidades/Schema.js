import mongoose, { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isHot: {
    type: Boolean,
    required: false,
  },
  smalltext: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "",
  },
  author: {
    type: String,
    default: "Boifubá",
  },
  author_img: {
    type: String,
    default: "/img/boifuba.webp",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [],
  },
  text: {
    type: String,
    default: "",
  },
  slug: {
    type: String,
    unique: true,
    default: undefined,
  },
  metatags: {
    type: [String],
    default: [],
  },
  show: {
    type: Boolean,
    default: "false",
  },
});

let Blog;

try {
  Blog = mongoose.model("Blog");
} catch (error) {
  Blog = mongoose.model("Blog", blogSchema, "Blog");
}

export default Blog;
