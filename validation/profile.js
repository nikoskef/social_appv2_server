const Joi = require("joi");

function validateProfile(req) {
  const schema = {
    //user: Joi.objectId().required(),
    handle: Joi.string()
      .min(2)
      .max(40)
      .required(),
    company: Joi.string()
      .min(2)
      .max(40),
    website: Joi.string()
      .uri()
      .min(2)
      .max(255),
    location: Joi.string()
      .min(2)
      .max(255),
    status: Joi.string()
      .min(3)
      .max(255)
      .required(),
    skills: Joi.string()
      .min(3)
      .max(255)
      .required(),
    bio: Joi.string()
      .min(5)
      .max(1024),
    githubusername: Joi.string()
      .min(2)
      .max(255),
    youtube: Joi.string()
      .uri()
      .min(2)
      .max(255),
    twitter: Joi.string()
      .uri()
      .min(2)
      .max(255),
    facebook: Joi.string()
      .uri()
      .min(2)
      .max(255),
    linkedin: Joi.string()
      .uri()
      .min(2)
      .max(255),
    instagram: Joi.string()
      .uri()
      .min(2)
      .max(255)
  };
  return Joi.validate(req, schema);
}

exports.validateProfile = validateProfile;
