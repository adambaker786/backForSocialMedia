const mongoose = require("mongoose");
const moment = require("moment");

const commentsSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },

  dateComments: {
    type: String,
    default: moment().calendar(),
  },
});

const Comment = mongoose.model("Comment", commentsSchema);

module.exports = Comment;
