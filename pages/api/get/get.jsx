import mongoose from "mongoose";
import dbConnect from "@/utilidades/dbConnect";
import Blog from "@/utilidades/Schema";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Conecta ao banco de dados
    await dbConnect();

    // Encontrar todos os documentos
    const blogPosts = await Blog.find({});

    res.status(200).json({
      message: "Blog posts fetched successfully",
      data: blogPosts,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);

    res.status(500).json({ error: "Error fetching blog posts" });
  }
}
