const Notification = require("../models/Notification.model");

module.exports.notificationController = {
  addNotification: async (req, res) => {
    try {
      const { text } = req.body;
      const notification = await Notification.create({
        text,
        user: req.params.id,
        fromUser: req.user.id,
      });
      res.status(201).json(notification);
    } catch (error) {
      res.status(401).json({ error: error.toString() });
    }
  },

  deleteNotification: async (req, res) => {
    try {
      await Notification.findByIdAndDelete(req.params.id);
      res.status(201).json("Успешно");
    } catch (error) {
      res.status(401).json({ error: error.toString() });
    }
  },

  getNotificationOneUser: async (req, res) => {
    try {
      const userNotification = await Notification.find({
        user: req.user.id,
      }).populate("fromUser");
      res.status(201).json(userNotification);
    } catch (error) {
      res.status(401).json({ error: error.toString() });
    }
  },
};
