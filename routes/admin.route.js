const { Router } = require("express");
const { commentController } = require("../controllers/comments.controller");
const { userController } = require("../controllers/user.controller");
const { postController } = require("../controllers/post.controller");
const applyMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.patch("/admin/user/:id", applyMiddleware, userController.editUser);

router.delete("/admin/user/:id", applyMiddleware, userController.deleteUser);
router.delete("/admin/post/:id", applyMiddleware, postController.deletePost);
router.delete(
  "/admin/comment/:id",
  applyMiddleware,
  commentController.deleteComment
);

module.exports = router;
