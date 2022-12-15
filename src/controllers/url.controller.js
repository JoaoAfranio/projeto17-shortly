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

export async function findShortenURLbyID(req, res) {
  const id = req.params.id;

  try {
    const selectShortUrl = await db.query("SELECT id, short_url, url FROM shorten_links WHERE id = $1", [id]);
    if (selectShortUrl.rowCount === 0) return res.sendStatus(404);

    res.status(200).send(selectShortUrl.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
