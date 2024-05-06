const express = require('express');
const commentController = require('../controller/commentsController');
const verifyToken = require('../controller/LoginAndRegisterController');

const router = express.Router();

router.get("/:id/comments", commentController.get_comments);
router.post("/:id/create", commentController.post_comment);
router.delete("/:id/deletecomment", verifyToken.verifyToken, commentController.post_delete_comment);

module.exports = router;