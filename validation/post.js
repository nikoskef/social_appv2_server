const Joi = require("joi");

function validatePost(req) {
  const schema = {
    text: Joi.string()
      .min(2)
      .max(255)
      .label("Text")
      .required(),
    name: Joi.string()
      .min(2)
      .max(40)
      .label("Name")
      .required(),
    avatar: Joi.string()
      .min(2)
      .max(255)
      .label("Avatar")
      .required()
  };
  return Joi.validate(req, schema);
}

exports.validatePost = validatePost;
