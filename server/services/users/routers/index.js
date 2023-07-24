const express = require("express");
const router = express.Router();
const usersRouter = require("./router-user");

router.use("/users", usersRouter);

module.exports = router;
