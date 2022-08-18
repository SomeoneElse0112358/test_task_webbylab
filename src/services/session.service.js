import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { createToken } from "../midlewares/token.js";
import { Session } from "../models/session.model.js";

class SessionService {
  async create(body) {
    const user = await User.findOne({ where: { email: body.email } });
    if (!user) {
      return { status: 0, message: "User not found" };
    }
    const validPassword = await bcrypt.compare(
      body.password,
      user.dataValues.password
    );
    if (!validPassword) {
      return { status: 0, message: "Password incorrect" };
    }
    const token = createToken(body.email);
    await Session.create({
      ...body,
      token: token,
    });

    return { token: token, status: 1 };
  }
}

export { SessionService };
