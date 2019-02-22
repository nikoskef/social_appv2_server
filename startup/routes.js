const express = require("express");
const auth = require("../routes/auth");
const posts = require("../routes/posts");
const profile = require("../routes/profile");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/profile", profile);
  app.use("/api/posts", posts);
};
