const Joi = require("joi");

function validateEducation(req) {
  const schema = {
    school: Joi.string()
      .min(2)
      .max(255)
      .required(),
    degree: Joi.string()
      .min(2)
      .max(255)
      .required(),
    fieldofstudy: Joi.string()
      .min(2)
      .max(255)
      .required(),
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

exports.validateEducation = validateEducation;
