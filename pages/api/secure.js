import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    jwt.verify(token, "banana");
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Se o token for válido, continue com a lógica da sua API
  return res.status(200).json({ message: "Secure data" });
}
