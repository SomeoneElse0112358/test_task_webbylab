import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import { string } from "joi";

dotenv.config({ path: "./.env" });

const env = cleanEnv(process.env, {
  DB_NAME: str({ default: "testdb" }),
  DB_USER: str({ default: "user" }),
  DB_PASSWORD: str({ default: "password" }),
  PORT: str({ default: 3000 }),
  TOKEN_SECRET: str(),
});

const envVariables = {
  port: env.PORT,
  secretToken: env.TOKEN_SECRET,
  name: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
};

export { envVariables };
