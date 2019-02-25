const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    text: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 40
    },
    avatar: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        text: {
          type: String,
          required: true
        },
        name: {
          type: String
        },
        avatar: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

exports.Post = Post;
