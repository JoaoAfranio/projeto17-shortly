import { Router } from "express";

import { registerValidation, loginValidation, tokenAuthentication } from "../middlewares/user.middleware.js";
import { register, login, findUserByToken } from "../controllers/user.controller.js";

import { schemaValidation } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/signup", schemaValidation("register"), registerValidation, register);
router.post("/signin", schemaValidation("login"), loginValidation, login);
router.get("/users/me", tokenAuthentication, findUserByToken);

export default router;
