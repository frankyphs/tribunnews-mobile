const express = require("express");
const router = express.Router();

const userRoute = require("./user");
const categoryRoute = require("./category");
const postRoute = require("./post");
const tagRoute = require("./tag");
const { errorHandle } = require("../handle/errorHandle");

router.use("/categories", categoryRoute);
router.use("/users", userRoute);
router.use("/posts", postRoute);
router.use("/tags", tagRoute);

router.use(errorHandle);

module.exports = router;
