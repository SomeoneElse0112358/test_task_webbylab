import express from "express";
import { UserController } from "../../../controllers/index.js";
import { validate } from "../../../midlewares/validate.js";
import { userSchema } from "../../../validation/index.js";
const router = express();
const usercontroller = new UserController();

router.route("/").post(validate(userSchema), usercontroller.create);

export { router };
