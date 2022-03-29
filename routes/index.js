const { Router } = require("express");
const importUser = require("./user.route");

const router = Router();

router.use(importUser);

module.exports = router;
