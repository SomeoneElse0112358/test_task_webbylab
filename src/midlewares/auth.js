import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { envVariables } from "../config/env.config.js";

const authorization = async (req, res, next) => {
  try {
    const token = `Bearer ${req.headers.authorization}`;
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "You are not logged in!" });
    }
    const decodedData = jwt.verify(
      token.split(" ")[1],
      envVariables.secretToken
    );
    const userInfo = await User.findOne({
      where: { email: decodedData.email },
    });

    if (!userInfo) {
      return res.status(401).json({ message: "You are not logged in!" });
    }

    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { authorization };
