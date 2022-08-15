import express from "express";
import multer from "multer";
import { validate } from "../../../midlewares/validate.js";
import {
  createSchema,
  getOneSchema,
  getListSchema,
  updateSchema,
  deleteSchema,
} from "../../../validation/index.js";
import { MovieController } from "../../../controllers/movie.controller.js";
const router = express();
const upload = multer();
const movieController = new MovieController();

router
  .route("/")
  .get(validate(getListSchema), movieController.getList)
  .post(validate(createSchema), movieController.create);

router
  .route("/:id")
  .get(validate(getOneSchema), movieController.getOne)
  .patch(validate(updateSchema), movieController.update)
  .delete(validate(deleteSchema), movieController.delete);

router.route("/import").post(upload.single("movies"), movieController.import);

export { router };
