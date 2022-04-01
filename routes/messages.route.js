const {Router} = require("express")
const { messageControllers } = require("../controllers/messages.controoler")
const authMiddleware = require("../middlewares/auth.middleware")

const router = Router()

router.post('/message', authMiddleware, messageControllers.postMessage)
router.get('/message/:id', authMiddleware, messageControllers.getMessages)

module.exports = router