const { Router } = require("express");
const importUser = require("./user.route");
const importPost = require("./post.route");
const importNotification = require("./notification.route");
const importComments = require("./comments.route");
const importConversation = require("./conversations.route");
const importMessage = require("./messages.route");
const importSaves = require("./saves.route");

const router = Router();

router.use(importUser);
router.use(importPost);
router.use(importNotification);
router.use(importComments);
router.use(importConversation);
router.use(importMessage);
router.use(importSaves);

module.exports = router;
