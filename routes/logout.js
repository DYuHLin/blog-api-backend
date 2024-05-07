const express = require('express');
const jwt = require("jsonwebtoken");
const registerController = require('../controller/LoginAndRegisterController');

const router = express.Router();
router.post("/", registerController.verifyToken, registerController.post_logout);
router.delete("/:id/delete", registerController.verifyToken, registerController.post_delete);

module.exports = router;