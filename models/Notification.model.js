const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  fromUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  dateCreateNotification: {
    type: String,
    default: moment().calendar(),
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
