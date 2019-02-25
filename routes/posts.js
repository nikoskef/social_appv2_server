const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts");

router.get("/test", postsController.getPostsTest);

module.exports = router;
