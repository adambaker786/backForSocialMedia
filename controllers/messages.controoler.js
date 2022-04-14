const Message = require("../models/Message.model");

module.exports.messageControllers = {
  postMessage: async (req, res) => {
    const { conversationId, text } = req.body;
    try {
      console.log(2);
      const saveMessage = await Message.create({
        conversationId,
        sender: req.user.id,
        text,
      });
      console.log(saveMessage._id.toString());
      const message = await Message.findById(
        saveMessage._id.toString()
      ).populate("sender");

      res.status(200).json(message);
    } catch (err) {
      res.status(500).json(err.toString());
    }
  },
  getMessages: async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.id,
      }).populate("sender");

      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err.toString());
    }
  },
};
