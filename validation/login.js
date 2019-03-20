const Joi = require("joi");

function validateLogin(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .label("Email")
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .label("Password")
      .required()
  };

  return Joi.validate(req, schema);
}

exports.validateLogin = validateLogin;
