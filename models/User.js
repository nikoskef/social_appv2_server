const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//const keys = require("../config/keys");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    avatar: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    }
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function() {
  const payload = { _id: this._id, name: this.name, avatar: this.avatar };
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 3600 });
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
