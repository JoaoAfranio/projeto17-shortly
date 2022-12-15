import { login, register } from "../schemas/user.js";
import db from "../database/db.js";

export async function registerValidation(req, res, next) {
  const user = req.body;

  const { error } = register.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  const existsEmail = await db.query("SELECT * FROM users WHERE email = $1", [user.email]);

  if (existsEmail.rowCount !== 0) return res.sendStatus(409);

  next();
}

export function loginBodyValidation(req, res, next) {
  const user = req.body;

  const { error } = login.validate({ user }, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  next();
}
