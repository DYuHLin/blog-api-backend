const express = require('express');
const jwt = require("jsonwebtoken");
const registerController = require('../controller/LoginAndRegisterController');

const router = express.Router();
router.post("/", registerController.post_login);

module.exports = router;