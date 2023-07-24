const express = require("express");
const Controller = require("../controllers/ControllerUser");
const router = express.Router();

const authentication = require("../middleware/Authentication");

router.post("/register", authentication, Controller.handleRegister);
router.post("/login", Controller.handleLogin);

module.exports = router;
