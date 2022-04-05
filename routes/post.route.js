const { Router } = require("express");
const { postController } = require("../controllers/post.controller");
const postImage = require("../middlewares/postImage.middleware");
const applyMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/posts", postController.getPosts);
router.get("/post", postController.getPost);
router.get("/user/posts", applyMiddleware, postController.getPostOneUser);

router.post(
  "/post",
  applyMiddleware,
  postImage.single("image"),
  postController.addPost
);

router.patch(
  "/post/:id",
  applyMiddleware,
  postImage.single("image"),
  postController.editPost
);
router.patch("/add/like/:id", applyMiddleware, postController.addLikePost);
router.patch(
  "/remove/like/:id",
  applyMiddleware,
  postController.removeLikePost
);

router.delete("post/:id", applyMiddleware, postController.deletePost);

module.exports = router;
