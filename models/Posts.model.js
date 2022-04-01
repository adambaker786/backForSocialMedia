const mongoose = require("mongoose");
const moment = require("moment");

const postSchema = mongoose.Schema({
  imagePost: {
    type: String,
    default: "",
  },

  text: {
    type: String,
    required: true,
  },

  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  datePublication: {
    type: String,
    default: moment().calendar(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
