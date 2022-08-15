import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config.js";

class Session extends Model {}

Session.init(
  {
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "sessions",
    timestamps: true,
  }
);

export { Session };
