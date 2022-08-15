import { Sequelize } from "sequelize";
import { envVariables } from "./env.config.js";

const sequelize = new Sequelize(
  envVariables.name,
  envVariables.user,
  envVariables.password,
  {
    dialect: "sqlite",
    host: "./src/db/dev.sqlite",
  }
);

export { sequelize };
