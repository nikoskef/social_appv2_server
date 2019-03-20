const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    handle: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 40,
      unique: true
    },
    company: {
      type: String,
      minlength: 2,
      maxlength: 40
    },
    website: {
      type: String,
      minlength: 2,
      maxlength: 255
    },
    location: {
      type: String,
      minlength: 2,
      maxlength: 255
    },
    status: {
      type: String,
      required: true,
      maxlength: 255
    },
    skills: {
      type: Array,
      required: true,
      maxlength: 1024
    },
    bio: {
      type: String,
      minlength: 5,
      maxlength: 1024
    },
    githubusername: {
      type: String,
      minlength: 2,
      maxlength: 255
    },
    experience: [
      {
        title: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 255
        },
        company: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 255
        },
        location: {
          type: String,
          minlength: 2,
          maxlength: 255
        },
        from: {
          type: Date,
          required: true
        },
        to: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description: {
          type: String,
          minlength: 2,
          maxlength: 1024
        }
      }
    ],
    education: [
      {
        school: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 255
        },
        degree: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 255
        },
        fieldofstudy: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 255
        },
        from: {
          type: Date,
          required: true
        },
        to: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description: {
          type: String,
          minlength: 2,
          maxlength: 1024
        }
      }
    ],
    social: {
      youtube: {
        type: String,
        minlength: 2,
        maxlength: 255
      },
      twitter: {
        type: String,
        minlength: 2,
        maxlength: 255
      },
      facebook: {
        type: String,
        minlength: 2,
        maxlength: 255
      },
      linkedin: {
        type: String,
        minlength: 2,
        maxlength: 255
      },
      instagram: {
        type: String,
        minlength: 2,
        maxlength: 255
      }
    }
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

exports.Profile = Profile;
