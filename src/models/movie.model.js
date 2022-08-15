import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config.js";

class Movie extends Model {}

Movie.init(
  {
    title: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    format: {
      type: DataTypes.STRING,
    },
    actors: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "movies",
    timestamps: true,
  }
);

export { Movie };
