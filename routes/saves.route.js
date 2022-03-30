const { Router } = require("express");
const { savesController } = require("../controllers/saves.controller");

const router = Router();

router.get("/saves", savesController.getSaves);

module.exports = router;
