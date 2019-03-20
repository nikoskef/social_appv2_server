const Joi = require("joi");

function validateRegister(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .label("Name")
      .required(),
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
      .required(),
    password2: Joi.any()
      .valid(Joi.ref("password"))
      .label("Confirm Password")
      .required()
      .options({ language: { any: { allowOnly: "Passwords do not match" } } })
  };

  return Joi.validate(user, schema);
}

exports.validateRegister = validateRegister;
