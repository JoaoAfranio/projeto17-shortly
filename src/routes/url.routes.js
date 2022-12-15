import { Router } from "express";
import { insertShortenURL } from "../controllers/url.controller.js";
import { tokenAuthentication } from "../middlewares/user.middleware.js";

import { schemaValidation } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/urls/shorten", tokenAuthentication, schemaValidation("insertShortenURL"), insertShortenURL);

export default router;
