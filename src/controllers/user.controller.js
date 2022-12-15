import bcrypt from "bcrypt";
import db from "../database/db.js";
import { v4 as uuidV4 } from "uuid";

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

export async function login(req, res) {
  const user = res.locals.user;
  const token = uuidV4();
  try {
    const sessionExists = await db.query("SELECT * FROM sessions WHERE id_user = $1", [user.id]);
    if (sessionExists.rowCount !== 0) {
      await db.query("DELETE FROM sessions WHERE id_user = $1", [user.id]);
    }

    await db.query("INSERT INTO sessions (id_user, token) VALUES ($1, $2)", [user.id, token]);
    res.status(200).send(token);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
