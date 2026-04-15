import dotenv from "dotenv";
import express from "express";
import { prisma } from "db/client";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany()
  return res.status(200).json({ users })
})

app.post("/user", async(req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });  
  }

  const user = await prisma.user.create({
    data: {
      username,
      password: String(password)
    }
  })
  if(!user){
    return res.status(400).json({ msg: 'user not created'})
  }

  return res.status(201).json({ user })
})

app.listen(8080);