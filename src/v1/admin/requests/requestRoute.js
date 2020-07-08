const express = require('express');

const router = express.Router();

const controller = require('./requestController');

// middleware: only signed in users can access this route
const auth = require('../../middlewares/auth');

const { getAllRequests } = controller;
router.get('/', auth, getAllRequests);

module.exports = router;
