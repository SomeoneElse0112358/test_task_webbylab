import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config.js";

class Actor extends Model {}

Actor.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "actors",
    timestamps: true,
  }
);

export { Actor };
