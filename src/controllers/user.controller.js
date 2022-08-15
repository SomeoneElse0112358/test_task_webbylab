import { UserService } from "../services/user.service.js";
const userService = new UserService();

class UserController {
  async create(req, res) {
    const result = await userService.create(req.body);
    if (!result.status) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  }
}

export { UserController };
