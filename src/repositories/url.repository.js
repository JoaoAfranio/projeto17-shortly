import db from "../database/db.js";

async function insertUrl(id_user, shortUrl, url) {
  return db.query("INSERT INTO shorten_links (id_user, short_url, url) VALUES ($1, $2, $3)", [id_user, shortUrl, url]);
}

async function findUrlById(id) {
  return db.query("SELECT id, short_url, url FROM shorten_links WHERE id = $1", [id]);
}

async function openUrl(shortUrl) {
  return db.query("SELECT id, visit_count, url FROM shorten_links where short_url = $1", [shortUrl]);
}

async function deleteUrlById(id) {
  return db.query("DELETE FROM shorten_links WHERE id = $1", [id]);
}

async function getRankUsers() {
  return db.query(`
  SELECT users.id, name, 
    COALESCE(sum(visit_count)::int, 0) as "visitCount",
    count(links)::int as "linksCount"
    FROM users
    LEFT JOIN shorten_links as links on users.id = links.id_user
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10;`);
}

async function sumCountVisit(visitCount, id) {
  return db.query("UPDATE shorten_links SET visit_count = $1 WHERE id = $2", [visitCount, id]);
}

export const urlRepository = {
  insertUrl,
  findUrlById,
  openUrl,
  deleteUrlById,
  getRankUsers,
  sumCountVisit,
};
