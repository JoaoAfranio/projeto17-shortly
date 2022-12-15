import bcrypt from "bcrypt";
import db from "../database/db.js";

export async function register(req, res) {
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, passwordHash]);

  res.sendStatus(201);

  try {
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
