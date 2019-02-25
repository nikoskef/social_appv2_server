const Joi = require("joi");

function validateExperience(req) {
  const schema = {
    title: Joi.string()
      .min(2)
      .max(255)
      .required(),
    company: Joi.string()
      .min(2)
      .max(255)
      .required(),
    location: Joi.string()
      .min(2)
      .max(255),
    from: Joi.date()
      .max("now")
      .required(),
    to: Joi.date().max("now"),
    current: Joi.boolean(),
    description: Joi.string()
      .min(2)
      .max(1024)
  };
  return Joi.validate(req, schema);
}

exports.validateExperience = validateExperience;
