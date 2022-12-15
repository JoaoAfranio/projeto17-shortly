import { Router } from "express";

import { registerValidation, loginValidation } from "../middlewares/user.middleware.js";
import { register, login } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", registerValidation, register);
router.post("/signin", loginValidation, login);

export default router;
