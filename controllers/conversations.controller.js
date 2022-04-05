const Conversation = require("../models/Conversation.model");

module.exports.conversationControllers = {
  postConversation: async (req, res) => {
    try {
      const conversation = await Conversation.create({
        members: [req.user.id, req.body.reciverId],
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err.toString());
    }
  },
  getConversation: async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.user.id] },
      }).populate("members");
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
