const express = require("express");
const router = express.Router();

const { validateLogin } = require("../validation/login");
const { validateRegister } = require("../validation/register");
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");

const userController = require("../controllers/users");

router.get("/test", userController.getAuthTest);

router.post("/register", validate(validateRegister), userController.registerUser);

router.post("/login", validate(validateLogin), userController.loginUser);

router.get("/current", auth, userController.getCurrent);

module.exports = router;
