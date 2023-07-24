const router = require("express").Router();

const userRoute = require("./router-user");
const postRoute = require("./router-post");

router.use("/posts", postRoute);
router.use("/users", userRoute);

module.exports = router;
