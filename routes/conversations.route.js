const {Router} = require("express")
const { conversationControllers } = require("../controllers/conversations.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = Router()

router.post("/conversation", authMiddleware, conversationControllers.postConversation)
router.get("/conversation", authMiddleware, conversationControllers.getConversation)

module.exports = router