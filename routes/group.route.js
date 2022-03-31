const { Router } = require("express");
const { groupController } = require("../controllers/group.controller");
const applyMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/groups", groupController.getGroups);

router.post("/group", applyMiddleware, groupController.addGroup);

router.patch("/group", applyMiddleware, groupController.editGroup);
router.patch(
  "/group/userAdd/:id",
  applyMiddleware,
  groupController.addUserInGroup
);
router.patch(
  "/group/userRemove/:id",
  applyMiddleware,
  groupController.removeUserInGroup
);

router.delete("/group", applyMiddleware, groupController.deleteGroup);

module.exports = router;
