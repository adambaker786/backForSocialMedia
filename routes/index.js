const { Router } = require("express");
const importUser = require("./user.route");
const importPost = require("./post.route");

const router = Router();

router.use(importUser);
router.use(importPost);

module.exports = router;
