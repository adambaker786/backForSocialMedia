const { Router } = require("express");
const { commentController } = require("../controllers/comments.controller");
const applyMiddleware = require("../middlewares/auth.middleware");

const router = Router();


router.get("/comments/:id", commentController.getComments);

router.post("/comment/:id", applyMiddleware, commentController.addComment);
router.delete("/comment/:id", applyMiddleware, commentController.deleteComment);

module.exports = router;
