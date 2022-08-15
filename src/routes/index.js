import express from "express";
import { router as apiRouter } from "./api/index.js";
const router = express();

router.use("/api", apiRouter);

export { router };
