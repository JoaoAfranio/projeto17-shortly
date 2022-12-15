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

export async function findUserByToken(req, res) {
  const session = res.locals.session;

  try {
    const selectUser = await db.query(
      `
    SELECT users.id, name, sum(visit_count)::int as "visitCount",
      json_agg(
        json_build_object(
        'id', links.id,
        'shortUrl', short_url,
        'url', url,
        'visitCount', visit_count
        )
      ) as "shortenedUrls"
      FROM users
      JOIN shorten_links as links on users.id = links.id_user
      WHERE users.id = $1
      GROUP BY users.id;`,
      [session.id_user]
    );

    res.status(200).send(selectUser.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
