import { MovieService } from "../services/movie.service.js";
const movieService = new MovieService();

class MovieController {
  async create(req, res) {
    const result = await movieService.create(req.body);
    if (!result.status) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  }

  async getOne(req, res) {
    const result = await movieService.getOne(req.params.id);
    if (!result.status) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  }

  async getList(req, res) {
    const result = await movieService.getList(req.query);
    if (!result.status) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  }

  async update(req, res) {
    const result = await movieService.update(req.params.id, req.body);
    if (!result.status) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  }

  async delete(req, res) {
    const result = await movieService.delete(req.params.id);
    if (!result.status) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  }

  async import(req, res) {
    if (req.file.mimetype !== "text/plain") {
      return res
        .status(400)
        .json({ message: "Please add a file with .txt extension!" });
    }
    const result = await movieService.import(req.file.buffer);
    return res.status(201).json(result);
  }
}

export { MovieController };
