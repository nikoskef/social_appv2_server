const express = require("express");
const users = require("../routes/users");
const posts = require("../routes/posts");
const profile = require("../routes/profile");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/profile", profile);
  app.use("/api/posts", posts);
  app.use(error);
};
