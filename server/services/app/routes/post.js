const express = require("express");
const Controller = require("../controllers/ControllerPost");
const router = express.Router();
// const authentication = require("../middleware/Authentication");

router.get("/", Controller.getPost);
router.post("/", Controller.createPost);
router.get("/:id", Controller.getPostById);
router.put("/:id", Controller.editPostById);

router.delete("/:id", Controller.deletePostById);

module.exports = router;
