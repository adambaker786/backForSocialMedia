const { Router } = require("express");
const { postController } = require("../controllers/post.controller");
const postImage = require("../middlewares/postImage.middleware");
const applyMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/posts", postController.getPosts);
router.get("/post", postController.getPost);
router.get("/user/posts/:id", postController.getPostOneUser);

router.post("/post", applyMiddleware, postImage, postController.addPost);

router.patch("/post/:id", applyMiddleware, postImage, postController.editPost);
router.patch("/add/like", applyMiddleware, postController.addLikePost);
router.patch("/remove/like", applyMiddleware, postController.removeLikePost);

router.delete("post/:id", applyMiddleware, postController.deletePost);

module.exports = router;
