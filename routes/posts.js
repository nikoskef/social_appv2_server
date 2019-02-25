const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { validatePost } = require("../validation/post");

router.get("/test", postsController.getPostsTest);

router.get("/", postsController.getPosts);

router.get("/:id", postsController.getPostById);

router.post("/", auth, validate(validatePost), postsController.createPost);

router.delete("/:id", auth, postsController.deletePost);

router.post("/like/:id", auth, postsController.likePost);

router.post("/unlike/:id", auth, postsController.unlikePost);

router.post("/comment/:id", auth, validate(validatePost), postsController.postComment);

router.delete("/comment/:id/:comment_id", auth, postsController.deleteComment);

module.exports = router;
