import express from "express";
import { SessionController } from "../../../controllers/index.js";
import { validate } from "../../../midlewares/validate.js";
import { sessionSchema } from "../../../validation/index.js";
const router = express();
const sessionController = new SessionController();

router.route("/").post(validate(sessionSchema), sessionController.create);

export { router };
