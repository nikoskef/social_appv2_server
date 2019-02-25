const mongoose = require("mongoose");
const { Post } = require("../models/Post");
const { Profile } = require("../models/Profile");

exports.getPostsTest = (req, res) => {
  res.json({ message: "Posts is working" });
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  if (!posts) return res.status(404).json({ message: "No posts were found." });
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const id = req.params.id;

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).json({ message: "Not valid id." });

  const post = await Post.findOne({ _id: id });

  if (!post) return res.status(400).json({ message: "Not Post was found with the given id." });

  res.json(post);
};

exports.createPost = async (req, res) => {
  const { text, name, avatar } = req.body;
  const { _id } = req.user;

  const post = await new Post({ text, name, avatar, user: _id }).save();
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const id = req.params.id;

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).json({ message: "Not valid id." });

  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) return res.status(404).json({ message: "Profile not found for specific user." });

  const post = await Post.findById(id);
  if (!post) return res.status(400).json({ message: "Not Post was found with the given id." });

  if (post.user.toString() !== req.user._id) {
    return res.status(401).json({ message: "Not Authorize" });
  }

  await post.remove();
  res.json({ success: true });
};

exports.likePost = async (req, res) => {
  const id = req.params.id;

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).json({ message: "Not valid id." });

  const post = await Post.findById(id);
  if (!post) return res.status(400).json({ message: "Not Post was found with the given id." });

  if (post.likes.filter(like => like.user.toString() === req.user._id).length > 0) {
    return res.status(400).json({ message: "User already liked this post." });
  }
  post.likes.unshift({ user: req.user._id });
  await post.save();
  res.json(post);
};

exports.unlikePost = async (req, res) => {
  const id = req.params.id;

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).json({ message: "Not valid id." });

  const post = await Post.findById(id);
  if (!post) return res.status(400).json({ message: "Not Post was found with the given id." });

  const likeIndex = post.likes.findIndex(like => like.user.toString() === req.user._id.toString());
  if (likeIndex === -1)
    return res.status(400).json({ message: "User have not yet liked this post." });

  post.likes.splice(likeIndex, 1);
  await post.save();
  res.json(post);
};

exports.postComment = async (req, res) => {
  const id = req.params.id;

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).json({ message: "Not valid id." });

  const post = await Post.findById(id);
  if (!post) return res.status(400).json({ message: "Not Post was found with the given id." });

  const { text, name, avatar } = req.body;
  const { _id } = req.user;

  const newComment = { text, name, avatar, user: _id };
  post.comments.unshift(newComment);
  await post.save();
  res.json(post);
};

exports.deleteComment = async (req, res) => {
  const id = req.params.id;

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).json({ message: "Not valid id." });

  const post = await Post.findById(id);
  if (!post) return res.status(400).json({ message: "Not Post was found with the given id." });

  let commentIndex = post.comments.findIndex(
    comment => comment.user.toString() === req.user._id.toString()
  );

  if (post.comments.filter(item => item._id.toString() === req.params.comment_id).length === 0) {
    return res.status(400).json({ message: "This comment does not exist" });
  }

  if (commentIndex === -1) return res.status(400).json({ message: "Not Authorized." });

  commentIndex = post.comments
    .map(comment => comment._id.toString())
    .indexOf(req.params.comment_id);

  post.comments.splice(commentIndex, 1);
  await post.save();
  res.json(post);
};
