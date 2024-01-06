import mongoose from "mongoose";
import dbConnect from "@/utilidades/dbConnect";
import Blog from "@/utilidades/Schema";

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Received PUT request for slug:", slug);

    // Conecta ao banco de dados
    await dbConnect();
    console.log("Connected to the database");

    // Adiciona um delay de 1 segundo (1000 milissegundos)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const options = {
      new: true,
      runValidators: true,
    };

    console.log("Updating blog post with data:", req.body);

    // Encontrar o documento pelo slug e atualizá-lo
    const updatedBlogPost = await Blog.findOneAndUpdate(
      { slug: slug },
      req.body,
      options
    );

    console.log("Updated blog post:", updatedBlogPost);

    if (!updatedBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.status(200).json({
      message: "Blog post updated successfully",
      data: updatedBlogPost,
    });
  } catch (error) {
    console.error("Error updating blog post:", error);

    res.status(500).json({ error: "Error updating blog post" });
  }
}
