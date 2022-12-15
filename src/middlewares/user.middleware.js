import { login, register } from "../schemas/user.js";
import bcrypt from "bcrypt";
import db from "../database/db.js";

export async function registerValidation(req, res, next) {
  const user = req.body;

  const existsEmail = await db.query("SELECT * FROM users WHERE email = $1", [user.email]);

  if (existsEmail.rowCount !== 0) return res.sendStatus(409);

  next();
}

export async function loginValidation(req, res, next) {
  const user = req.body;

  try {
    const selectUser = await db.query("SELECT * FROM users WHERE email = $1", [user.email]);

    if (!selectUser) {
      return res.sendStatus(401);
    }

    const infoUser = selectUser.rows[0];

    const passwordOk = bcrypt.compareSync(user.password, infoUser.password);
    if (!passwordOk) {
      return res.sendStatus(401);
    }

    res.locals.user = infoUser;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
