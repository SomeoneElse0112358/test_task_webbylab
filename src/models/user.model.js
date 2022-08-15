import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config.js";

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: true,
  }
);

export { User };
