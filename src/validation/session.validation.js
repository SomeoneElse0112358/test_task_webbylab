import Joi from "joi";

const sessionSchema = Joi.object({
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
  }),
});

export { sessionSchema };
