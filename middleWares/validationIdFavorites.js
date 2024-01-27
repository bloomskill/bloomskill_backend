const Joi = require("joi");
const { ValidationError } = require("../helpers");

const validateId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.required(),
  }).min(1);
  const validationResult = schema.validate({ id: req.params });
  if (validationResult.error) {
    return next(new ValidationError("Bad request (id incorrect)"));
  }
  next();
};

module.exports = { validateId };
