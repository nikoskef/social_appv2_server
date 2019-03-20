const mongoose = require("mongoose");
const { User } = require("../models/User");
const { Profile } = require("../models/Profile");

exports.getProfileTest = (req, res) => {
  res.json({ message: "Profile is working" });
};

exports.getProfile = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id }).populate("user", [
    "name",
    "avatar"
  ]);

  if (!profile) return res.status(404).json({ message: "Profile not found for specific user." });
  res.json(profile);
};

exports.createProfile = async (req, res) => {
  const {
    handle,
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = req.body;
  const profileFields = {};
  profileFields.user = req.user._id;

  if (handle) profileFields.handle = handle;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;

  //split skills into array

  if (!Array.isArray(skills) && typeof skills !== "undefined") {
    profileFields.skills = skills
      .split(",")
      .map(skill => skill.trim())
      .filter((value, index, array) => array.indexOf(value) === index);
  }
  //Social
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  let profile = await Profile.findOne({ user: req.user._id });
  if (profile) {
    //update
    profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileFields },
      { new: true }
    );
    res.json(profile);
  } else {
    let profile = await Profile.findOne({ handle: profileFields.handle });
    if (profile) return res.status(400).json({ message: "That handle already exists." });

    profile = await new Profile(profileFields).save();
    res.json(profile);
  }
};

exports.getProfileByHandle = async (req, res) => {
  const profile = await Profile.findOne({ handle: req.params.handle }).populate("user", [
    "name",
    "avatar"
  ]);
  if (!profile) return res.status(404).json({ message: "There is no profile for this user." });
  res.json(profile);
};

exports.getProfileById = async (req, res) => {
  const { user_id } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(user_id);
  if (!isValid) return res.status(400).json({ message: "Not valid id was given." });
  const profile = await Profile.findOne({ user: user_id }).populate("user", ["name", "avatar"]);
  if (!profile) return res.status(404).json({ message: "There is no profile for this user." });
  res.json(profile);
};

exports.getAllProfiles = async (req, res) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);

  if (!profiles) return res.status(404).json({ message: "There are no profiles." });

  res.json(profiles);
};

exports.postExperience = async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body;
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) return res.status(404).json({ message: "There is no profile for this user." });

  const newExp = { title, company, location, from, to, current, description };
  profile.experience.unshift(newExp);
  await profile.save();
  res.json(profile);
};

exports.postEducation = async (req, res) => {
  const { school, degree, fieldofstudy, from, to, current, description } = req.body;
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) return res.status(404).json({ message: "There is no profile for this user." });

  const newEdu = { school, degree, fieldofstudy, from, to, current, description };
  profile.education.unshift(newEdu);
  await profile.save();
  res.json(profile);
};

exports.deleteExperience = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) return res.status(404).json({ message: "There is no profile for this user." });

  const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

  if (removeIndex === -1) {
    return res.status(404).json({ message: "Specified experience does not exist" });
  }
  profile.experience.splice(removeIndex, 1);

  await profile.save();
  res.json(profile);
};

exports.deleteExperience = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) return res.status(404).json({ message: "There is no profile for this user." });

  const isValid = mongoose.Types.ObjectId.isValid(req.params.exp_id);
  if (!isValid) return res.status(400).json({ message: "Not valid id was given." });

  profile.experience.remove({ _id: req.params.exp_id });

  await profile.save();
  res.json(profile);
};

exports.deleteEducation = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) return res.status(404).json({ message: "There is no profile for this user." });

  const isValid = mongoose.Types.ObjectId.isValid(req.params.edu_id);
  if (!isValid) return res.status(400).json({ message: "Not valid id was given." });

  profile.education.remove({ _id: req.params.edu_id });

  await profile.save();
  res.json(profile);
};

exports.deleteUserAndProfile = async (req, res) => {
  await Profile.findOneAndRemove({ user: req.user._id });
  await User.findOneAndRemove({ _id: req.user._id });

  res.json({ message: "Success" });
};
