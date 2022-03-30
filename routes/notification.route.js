const { Router } = require("express");
const {
  notificationController,
} = require("../controllers/notification.controller");
const applyMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get(
  "/notification",
  applyMiddleware,
  notificationController.getNotificationOneUser
);

router.post(
  "/notification",
  applyMiddleware,
  notificationController.addNotification
);

router.delete("/notification", notificationController.deleteNotification);

module.exports = router;
