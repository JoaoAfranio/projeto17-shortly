import { Router } from "express";

import { registerValidation, loginValidation } from "../middlewares/user.middleware.js";
import { register, login } from "../controllers/user.controller.js";

import { schemaValidation } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/signup", schemaValidation("register"), registerValidation, register);
router.post("/signin", schemaValidation("login"), loginValidation, login);

export default router;
