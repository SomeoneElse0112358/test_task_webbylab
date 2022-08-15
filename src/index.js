import express from "express";
import morgan from "morgan";
import { router as routes } from "./routes/index.js";
import { sequelize } from "./config/database.config.js";
import { envVariables } from "./config/env.config.js";

const app = express();

sequelize
  .sync({ force: false })
  .then(() => console.log("Database has been connected..."));

app.use(morgan("common"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(routes);

app.listen(envVariables.port, () => console.log("Server has been started..."));
