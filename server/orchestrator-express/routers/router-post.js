const router = require("express").Router();
const Controller = require("../controllers/controller-posts");

router.get("/", Controller.getPosts);
router.post("/", Controller.postPost);
router.get("/:id", Controller.getPostDetail);
router.get("/:id", Controller.editPost);
router.delete("/:id", Controller.deletePost);

module.exports = router;
