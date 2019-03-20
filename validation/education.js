const Joi = require("joi");

function validateEducation(req) {
  const schema = {
    school: Joi.string()
      .min(2)
      .max(255)
      .label("School")
      .required(),
    degree: Joi.string()
      .min(2)
      .max(255)
      .label("Degree")
      .required(),
    fieldofstudy: Joi.string()
      .min(2)
      .max(255)
      .label("Field of Study")
      .required(),
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

exports.validateEducation = validateEducation;
