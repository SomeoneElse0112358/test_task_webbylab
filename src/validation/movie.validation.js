import Joi from "joi";

const createSchema = Joi.object({
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object({
    title: Joi.string().trim().required(),
    year: Joi.number().required().min(1850).max(2022).strict(),
    format: Joi.string().valid("VHS", "DVD", "Blu-Ray").required(),
    actors: Joi.array()
      .items(Joi.string().pattern(new RegExp("^[a-zA-Z ,-]{1,30}$")).required())
      .required(),
  }),
});

const getOneSchema = Joi.object({
  params: Joi.object({
    id: Joi.number().required(),
  }),
  query: Joi.object(),
  body: Joi.object(),
});

const getListSchema = Joi.object({
  params: Joi.object(),
  query: Joi.object({
    actor: Joi.string(),
    title: Joi.string(),
    search: Joi.string(),
    sort: Joi.string().valid("id", "title", "year"),
    order: Joi.string().valid("ASC", "DESC"),
    limit: Joi.number(),
    offset: Joi.number(),
  }),
  body: Joi.object(),
});

const updateSchema = Joi.object({
  params: Joi.object({
    id: Joi.number().required(),
  }),
  query: Joi.object(),
  body: Joi.object({
    title: Joi.string(),
    year: Joi.number().min(1850).max(2022),
    format: Joi.string().valid("VHS", "DVD", "Blu-Ray"),
    actors: Joi.array().items(
      Joi.string().pattern(new RegExp("^[a-zA-Z ,-]{1,30}$")).required()
    ),
  }),
});

const deleteSchema = Joi.object({
  params: Joi.object({
    id: Joi.number().required(),
  }),
  query: Joi.object(),
  body: Joi.object(),
});

export {
  createSchema,
  getOneSchema,
  getListSchema,
  updateSchema,
  deleteSchema,
};
