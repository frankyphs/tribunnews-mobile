const express = require("express");
const Controller = require("../controllers/ControllerCategory");
const router = express.Router();
// const authentication = require("../middleware/Authentication");

router.get("/", Controller.getCategory);
router.post("/", Controller.addCategory);
router.get("/:id", Controller.getCategoryById);
router.delete("/:id", Controller.deleteCategory);
router.put("/:id", Controller.updateCategory);

module.exports = router;
