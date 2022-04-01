const { Router } = require("express");
const { savesController } = require("../controllers/saves.controller");
const applyMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/saves", applyMiddleware, savesController.getSaves);

module.exports = router;
