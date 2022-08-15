import express from "express";
import { authorization } from "../../../midlewares/auth.js";
import { router as movieRouter } from "./movie.js";
import { router as sessionRouter } from "./session.js";
import { router as userRouter } from "./user.js";
const router = express();

router.use("/sessions", sessionRouter);
router.use("/movies", authorization, movieRouter);
router.use("/users", userRouter);

export { router };
