import { nanoid } from "nanoid";
import { urlRepository } from "../repositories/url.repository.js";
import db from "../database/db.js";

export async function insertShortenURL(req, res) {
  const { url } = req.body;
  const session = res.locals.session;
  const shortUrl = nanoid(8);

  try {
    await urlRepository.insertUrl(session.id_user, shortUrl, url);
    res.status(201).send({ shortUrl });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function findShortenURLbyID(req, res) {
  const id = req.params.id;

  try {
    const selectShortUrl = await urlRepository.findUrlById(id);
    if (selectShortUrl.rowCount === 0) return res.sendStatus(404);

    res.status(200).send(selectShortUrl.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function openURLbyID(req, res) {
  const shortUrl = req.params.shortUrl;

  try {
    const selectShortUrl = await urlRepository.openUrl(shortUrl);
    if (selectShortUrl.rowCount === 0) return res.sendStatus(404);

    const infoUrl = selectShortUrl.rows[0];
    const visitCount = infoUrl.visit_count + 1;

    await urlRepository.sumCountVisit(visitCount, infoUrl.id);

    res.redirect(infoUrl.url);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteUrlByID(req, res) {
  const id = req.params.id;

  try {
    await urlRepository.deleteUrlById(id);
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function rankingUsers(req, res) {
  try {
    const selectUsers = await urlRepository.getRankUsers();

    res.status(200).send(selectUsers.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
