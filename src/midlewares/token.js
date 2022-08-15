import jwt from "jsonwebtoken";
import { envVariables } from "../config/env.config.js";

export function createToken(email) {
  const payload = { email: email };
  return jwt.sign(payload, envVariables.secretToken, { expiresIn: "10s" });
}
