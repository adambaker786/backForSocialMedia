const Saves = require("../models/Saves.model");

module.exports.savesController = {
  getSaves: async (req, res) => {
    try {
      const saves = await Saves.find().populate("user");
      res.status(201).json(saves);
    } catch (error) {
      res.status(401).json({ error });
    }
  },
};
