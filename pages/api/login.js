import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const users = [
  {
    id: 1,
    username: "a",
    password: bcrypt.hashSync("a", 10), // senha hash para 'a'
  },
  // adicione mais usuários conforme necessário
];

export default async function handler(req, res) {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({ token });
}
