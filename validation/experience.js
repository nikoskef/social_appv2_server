const Joi = require("joi");

function validateExperience(req) {
  const schema = {
    title: Joi.string()
      .min(2)
      .max(255)
      .label("Title")
      .required(),
    company: Joi.string()
      .min(2)
      .max(255)
      .label("Company")
      .required(),
    location: Joi.string()
      .min(2)
      .label("Location")
      .max(255),
    from: Joi.date()
      .max("now")
      .label("From Date")
      .required(),
    to: Joi.date()
      .max("now")
      .label("To Date"),
    current: Joi.boolean().label("Current"),
    description: Joi.string()
      .label("Description")
      .min(2)
      .max(1024)
  };
  return Joi.validate(req, schema);
}

exports.validateExperience = validateExperience;
