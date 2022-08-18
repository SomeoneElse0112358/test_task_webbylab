import { Movie } from "../models/movie.model.js";
import { Actor } from "../models/actor.model.js";
import { Op } from "sequelize";

class MovieService {
  async #getActorInfo(str) {
    return await Promise.all(
      str.map(async (actor) => {
        const count = await Actor.count({ where: { name: actor } });
        if (count == 0) {
          Actor.create({ name: actor });
        }
        const result = await Actor.findOne({ where: { name: actor } });
        return result;
      })
    );
  }

  async create(body) {
    const existMovie = await Movie.findOne({
      where: { title: body.title, year: body.year },
    });
    if (existMovie) {
      return { status: 0, message: "Movie already exists" };
    }

    const actorInfo = await this.#getActorInfo(body.actors);

    const result = await Movie.create({
      ...body,
      actors: body.actors.toString(),
    });

    return { data: { ...result.dataValues, actors: actorInfo }, status: 1 };
  }

  async getOne(id) {
    const result = await Movie.findOne({ where: { id: id } });
    if (!result) {
      return { status: 0, message: "Movie not found" };
    }
    const actorsList = result.dataValues.actors.split(",");
    const actorInfo = await Promise.all(
      actorsList.map(async (actor) => {
        return (await Actor.findOne({ where: { name: actor } })).dataValues;
      })
    );

    return { data: { ...result.dataValues, actors: actorInfo }, status: 1 };
  }

  #composeFilter(actor, title, search) {
    if (actor && !title && !search) {
      return { actors: { [Op.like]: `%${actor}%` } };
    } else if (title && !actor && !search) {
      return { title: title };
    } else if (search && !actor && !title) {
      const searchFilter = search.split(",");
      console.log(searchFilter);
      return {
        title: searchFilter[0],
        actors: { [Op.like]: `%${searchFilter[1]}%` },
      };
    }
    return;
  }

  async getList(filter) {
    const {
      actor,
      title,
      sort = "id",
      search,
      limit = 20,
      offset = 0,
      order = "ASC",
    } = filter;
    const result = await Movie.findAll({
      where: this.#composeFilter(actor, title, search),
      attributes: { exclude: ["actors"] },
      order: [[sort, order]],
      limit: limit,
      offset: offset,
    });
    if (filter.sort === "title") {
      return result.sort((movie1, movie2) => {
        return movie1.title.localeCompare(movie2.title);
      });
    }
    return result;
  }

  async update(id, body) {
    if (body.actors) {
      await Movie.update(
        { ...body, actors: body.actors.toString() },
        { where: { id: id } }
      );
      const actorInfo = await this.#getActorInfo(body.actors);
      const result = await Movie.findOne({ where: { id: id } });

      return { data: { ...result.dataValues, actors: actorInfo }, status: 1 };
    }
    await Movie.update(body, { where: { id: id } });
    const result = await Movie.findOne({ where: { id: id } });
    const actorInfo = await this.#getActorInfo(
      result.dataValues.actors.split(",")
    );

    return { data: { ...result.dataValues, actors: actorInfo }, status: 1 };
  }

  async delete(id) {
    const movie = await this.getOne(id);

    if (!movie.status) {
      return movie;
    }
    const result = await Movie.destroy({
      where: {
        id: id,
      },
    });

    return { status: result, message: "Movie deleted successfully" };
  }

  async import(movies) {
    let obj = {};
    let splitted = movies
      .toString()
      .split("\n")
      .filter((str) => str != "");

    const dividedByMovie = [];
    for (let i = 0; i < splitted.length; i += 4) {
      const movie = splitted.slice(i, i + 4);
      dividedByMovie.push(movie);
    }
    let result = [];
    for (let i = 0; i < dividedByMovie.length; i++) {
      let splitTitle = dividedByMovie[i][0].split("e:");
      obj[splitTitle[0] + "e"] = splitTitle[1].trim();
      let splitYear = dividedByMovie[i][1].split(":");
      obj[splitYear[0]] = splitYear[1].trim();
      let splitFormat = dividedByMovie[i][2].split(":");
      obj[splitFormat[0]] = splitFormat[1].trim();
      let splitStars = dividedByMovie[i][3].split(":");
      obj[splitStars[0]] = splitStars[1].trim();

      const newMovie = await this.create({
        title: obj["Title"],
        year: obj["Release Year"],
        format: obj["Format"],
        actors: obj["Stars"].split(", "),
      });
      if (!newMovie.status) {
        continue;
      }
      const { actors, ...movieInfo } = newMovie.data;

      result.push(movieInfo);
    }
    return {
      data: result,
      meta: {
        imported: result.length,
        total: (await Movie.findAll()).length,
      },
    };
  }
}

export { MovieService };
