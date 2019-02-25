const Joi = require("joi");

function validatePost(req) {
  const schema = {
    text: Joi.string()
      .min(2)
      .max(255)
      .required(),
    name: Joi.string()
      .min(2)
      .max(40)
      .required(),
    avatar: Joi.string()
      .min(2)
      .max(255)
      .required()
  };
  return Joi.validate(req, schema);
}

exports.validatePost = validatePost;
