import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { userRepository } from "../repositories/user.repository.js";

export async function register(req, res) {
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  await userRepository.insertUser(name, email, passwordHash);

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
    const sessionExists = await userRepository.getSessionByUserId(user.id);
    if (sessionExists.rowCount !== 0) {
      await userRepository.deleteSessionByUserId(user.id);
    }

    await userRepository.insertSession(user.id, token);
    res.status(200).send(token);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function findUserByToken(req, res) {
  const session = res.locals.session;

  try {
    const selectUser = await userRepository.getUserById(session.id_user);

    res.status(200).send(selectUser.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
