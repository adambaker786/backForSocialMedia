const moment = require("moment");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  login: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    default: "",
  },

  role: {
    type: String,
    default: "user",
  },

  freinds: [{
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  }],

  follows: [
    {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId
    }
  ],

  registredDate: {
    type: String,
    default: moment().format("LLLL"),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
