const mongoose = require("mongoose");

const savesSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  saves: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
});

const Saves = mongoose.model("Saves", savesSchema);

module.exports = Saves;
