import { Router } from "express";
import { insertShortenURL, findShortenURLbyID, openURLbyID, deleteUrlByID } from "../controllers/url.controller.js";
import { tokenAuthentication } from "../middlewares/user.middleware.js";
import { deleteValidation } from "../middlewares/url.middleware.js";

import { schemaValidation } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/urls/shorten", tokenAuthentication, schemaValidation("insertShortenURL"), insertShortenURL);
router.get("/urls/:id", findShortenURLbyID);
router.get("/urls/open/:shortUrl", openURLbyID);
router.delete("/urls/:id", tokenAuthentication, deleteValidation, deleteUrlByID);

export default router;
