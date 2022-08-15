import { SessionService } from "../services/session.service.js";
const sessionService = new SessionService();

class SessionController {
  async create(req, res) {
    const result = await sessionService.create(req.body);
    if (!result.status) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  }
}

export { SessionController };
