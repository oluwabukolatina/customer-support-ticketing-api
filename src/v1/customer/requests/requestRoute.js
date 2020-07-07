const express = require('express');

const router = express.Router();

const controller = require('./requestController');

// middleware: only signed in users can access this route
const auth = require('../../middlewares/auth');

const { createRequest, getAUserRequests } = controller;
router.post('/', auth, createRequest);
router.get('/user', auth, getAUserRequests);
module.exports = router;
