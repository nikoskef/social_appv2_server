const Joi = require("joi");

function validateProfile(req) {
  const schema = {
    //user: Joi.objectId().required(),
    handle: Joi.string()
      .min(2)
      .max(40)
      .label("Handle")
      .required(),
    company: Joi.string()
      .min(2)
      .max(40)
      .label("Company"),
    website: Joi.string()
      .uri()
      .label("Website")
      .min(2)
      .max(255),
    location: Joi.string()
      .min(2)
      .max(255)
      .label("Location"),
    status: Joi.string()
      .min(3)
      .max(255)
      .label("Status")
      .required(),
    skills: Joi.any()
      // .min(3)
      // .max(255)
      .label("Skills")
      .required(),
    bio: Joi.string()
      .min(5)
      .max(1024)
      .label("Bio"),
    githubusername: Joi.string()
      .min(2)
      .max(255)
      .label("GitHub Username"),
    youtube: Joi.string()
      .uri()
      .label("YouTube")
      .min(2)
      .max(255),
    twitter: Joi.string()
      .uri()
      .label("Twitter")
      .min(2)
      .max(255),
    facebook: Joi.string()
      .uri()
      .label("Facebook")
      .min(2)
      .max(255),
    linkedin: Joi.string()
      .uri()
      .label("LinkedIn")
      .min(2)
      .max(255),
    instagram: Joi.string()
      .uri()
      .label("Instagram")
      .min(2)
      .max(255)
  };
  return Joi.validate(req, schema, { allowUnknown: true });
}

exports.validateProfile = validateProfile;
