import Joi from "joi";

const userSchema = Joi.object({
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(8).max(20).required(),
    password: Joi.string().min(8).max(20).required(),
    confirmPassword: Joi.string().min(8).max(20).required(),
  }),
});

export { userSchema };
