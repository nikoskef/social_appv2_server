const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");

exports.getAuthTest = (req, res) => {
  res.json({ message: "Users is working" });
};

exports.registerUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: "User already registered." });

  const { name, email, password } = req.body;
  const avatar = await gravatar.url(email, {
    s: "200", //Size
    r: "pg", // Rating
    d: "mm" //default
  });

  user = new User({
    name,
    email,
    avatar,
    password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.json(user);
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid Email or Password." });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: "Invalid Email or Password." });

  const token = user.generateAuthToken();

  res.json({
    success: true,
    token: token
  });
};

exports.getCurrent = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -__v");
  res.json(user);
};
