import express from "express";
import { router as v1Router } from "./v1/index.js";
const router = express();

router.use("/v1", v1Router);

export { router };
