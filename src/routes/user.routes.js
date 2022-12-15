import { Router } from "express";

import { registerValidation } from "../middlewares/user.middleware.js";
import { register } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", registerValidation, register);

export default router;
