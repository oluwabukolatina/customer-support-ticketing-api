"use strict";
var express = require('express');
var router = express.Router();
var controller = require('../../controllers/auth/auth');
var loginUser = controller.loginUser, registerUser = controller.registerUser;
router.post('/login', loginUser);
router.post('/register', registerUser);
module.exports = router;
