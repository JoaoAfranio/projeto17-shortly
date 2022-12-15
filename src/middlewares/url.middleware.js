import db from "../database/db.js";

export async function deleteValidation(req, res, next) {
  const idUrl = req.params.id;
  const session = res.locals.session;

  if (!idUrl || isNaN(idUrl)) return res.sendStatus(401);

  try {
    const selectUrl = await db.query("SELECT * FROM shorten_links WHERE id_user = $1 AND id = $2", [session.id_user, idUrl]);
    if (selectUrl.rowCount === 0) return res.sendStatus(401);

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
