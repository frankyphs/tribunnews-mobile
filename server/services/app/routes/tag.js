const express = require("express");
const Controller = require("../controllers/ControllerTag");
const router = express.Router();

router.get("/", Controller.getTags);
router.get("/:id", Controller.getTagDetail);
router.post("/", Controller.addTag);
router.delete("/:id", Controller.deleteTag);

module.exports = router;
