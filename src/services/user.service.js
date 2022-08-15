import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { createToken } from "../midlewares/token.js";

class UserService {
  async create(body) {
    if (body.password !== body.confirmPassword) {
      return {
        status: 0,
        message: "Your password and confirmation password do not match.",
      };
    } else if (await User.findOne({ where: { email: body.email } })) {
      return {
        status: 0,
        message: `Email ${body.email} already exists!`,
      };
    }

    await User.create({
      ...body,
      password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
    });

    return { token: createToken(body.email), status: 1 };
  }
}

export { UserService };
