const express = require('express');

const router = express.Router();

const controller = require('../../controllers/auth/auth');

const { loginUser, registerUser } = controller;
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
