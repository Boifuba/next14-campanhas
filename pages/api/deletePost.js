// pages/api/deletePost.js
import dbConnect from "@/utilidades/dbConnect";
import Blog from "@/utilidades/Schema";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;
    await dbConnect();

    try {
      await Blog.findByIdAndDelete(id);
      res.status(200).json({ message: "Blog post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting blog post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
