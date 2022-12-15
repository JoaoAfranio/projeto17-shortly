import { Router } from "express";
import { insertShortenURL, findShortenURLbyID, openURLbyID } from "../controllers/url.controller.js";
import { tokenAuthentication } from "../middlewares/user.middleware.js";

import { schemaValidation } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/urls/shorten", tokenAuthentication, schemaValidation("insertShortenURL"), insertShortenURL);
router.get("/urls/:id", findShortenURLbyID);
router.get("/urls/open/:shortUrl", openURLbyID);

export default router;
