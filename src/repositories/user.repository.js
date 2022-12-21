import db from "../database/db.js";

async function insertUser(name, email, passwordHash) {
  return db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, passwordHash]);
}

async function getSessionByUserId(id) {
  return db.query("SELECT * FROM sessions WHERE id_user = $1", [id]);
}

async function deleteSessionByUserId(id) {
  return db.query("DELETE FROM sessions WHERE id_user = $1", [id]);
}

async function insertSession(id, token) {
  return db.query("INSERT INTO sessions (id_user, token) VALUES ($1, $2)", [id, token]);
}

async function getUserById(id) {
  return db.query(
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
    [id]
  );
}

export const userRepository = {
  insertUser,
  getSessionByUserId,
  deleteSessionByUserId,
  insertSession,
  getUserById,
};
