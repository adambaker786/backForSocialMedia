const Comment = require("../models/Comments.model");

module.exports.commentController = {
  addComment: async (req, res) => {
    try {
      const { text } = req.body;
      const comment = await Comment.create({
        text,
        user: req.user.id,
        post: req.params.id,
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(401).json({ error: error.toString() });
    }
  },

  deleteComment: async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(201).json("Успешно");
    } catch (error) {
      res.status(401).json({ error: error.toString() });
    }
  },

  getComments: async (req, res) => {
    try {
      const comments = await Comment.find().populate("user");
      res.status(201).json(comments);
    } catch (error) {
      res.status(401).json({ error: error.toString() });
    }
  },
};
