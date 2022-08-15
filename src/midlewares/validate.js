const validate = (schema) => async (req, res, next) => {
  const { body, params, query } = req;

  const validation = schema.validate({ body, params, query });
  if (validation.error)
    return res
      .status(400)
      .json({ message: validation.error.details[0].message });

  next();
};

export { validate };
