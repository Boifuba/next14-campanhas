import dbConnect from "../../src/utilidades/dbConnect";
import BlogModel from "../../src/utilidades/Schema";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const newBlogPost = new BlogModel(req.body);
    try {
      await newBlogPost.save();
      res.status(201).json(newBlogPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
