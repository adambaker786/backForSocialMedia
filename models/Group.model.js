const mongoose = require("mongoose");
const moment = require("moment");

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    default: "",
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  users: {
    type: Object,
    default: [],
  },

  createGroup: {
    type: String,
    default: moment().format("LLLL"),
  },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
