const express = require('express');
const postController = require('../controller/postController');
const verifyToken = require('../controller/LoginAndRegisterController');

const router = express.Router();

router.get("/", postController.get_posts);
router.get("/user/:id", postController.get_user_posts);
router.get("/:id", postController.get_single_post);
router.post("/create", postController.post_post);
router.put("/:id/update", verifyToken.verifyToken, postController.update_post);
router.get("/:id/update", postController.get_single_post);
router.delete("/:id/delete", verifyToken.verifyToken, postController.post_delete_post);

module.exports = router;