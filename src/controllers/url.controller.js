import { nanoid } from "nanoid";
import db from "../database/db.js";

export async function insertShortenURL(req, res) {
  const { url } = req.body;
  const session = res.locals.session;
  const shortUrl = nanoid(8);

  try {
    await db.query("INSERT INTO shorten_links (id_user, short_url, url) VALUES ($1, $2, $3)", [session.id_user, shortUrl, url]);
    return res.status(201).send({ shortUrl });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
