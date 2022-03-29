const { Router } = require("express");
const { userController } = require("../controllers/user.controller");

const router = Router();

router.get("/user", userController.getUser);
router.get("/users", userController.getUsers);

router.post("/user/signup", userController.registerUser);
router.post("/user/signin", userController.loginUser);

router.patch("/user", userController.editUser);

module.exports = router;
