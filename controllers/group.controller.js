const Group = require("../models/Group.model");

module.exports.groupController = {
  addGroup: async (req, res) => {
    try {
      const { name, desc } = req.body;
      const group = await Group.create({
        name,
        desc,
        avatar: req.file ? req.file.path : "",
        user: req.user.id,
      });
      res.status(201).json(group);
    } catch (error) {
      res.status(401).json({ error: error.toString() });
    }
  },

  deleteGroup: async (req, res) => {
    try {
      await Group.findByIdAndDelete(req.params.id);
      res.status(201).json("Сообщество удалено");
    } catch (error) {
      res.status(401).json({ error: error.toString() });
    }
  },

  editGroup: async (req, res) => {
    try {
      const { name, desc } = req.body;
      await Group.create({
        name,
        desc,
        avatar: req.file ? req.file.path : "",
      });
      res.status(201).json("Изменения прошли успешно");
    } catch (error) {
      res.status(401).json({ error: error.toString() });
    }
  },

  addUserInGroup: async (req, res) => {
    try {
      const nameGroup = await Group.findById(req.params.id);
      await Group.findByIdAndUpdate(req.params.id, {
        $addToSet: { users: req.body.id },
      });
      res.status(201).json(`Вы вступили в ${nameGroup.name}`);
    } catch (error) {
      res.status(401).json({ error: error.toString() });
    }
  },

  removeUserInGroup: async (req, res) => {
    try {
      const nameGroup = await Group.findById(req.params.id);
      await Group.findByIdAndUpdate(req.params.id, {
        $pull: { users: req.body.id },
      });
      res.status(201).json(`Вы вышли из ${nameGroup.name}`);
    } catch (error) {
      res.status(401).json({ error: error.toString() });
    }
  },
};
