const express = require('express');

const router = express.Router();

const controller = require('../../controllers/comment/comment.controller');

// middleware: only signed in user(admin/customer) can access this route
const auth = require('../../middlewares/auth');

const { commentOnRequest } = controller;
router.post('/:id', auth, commentOnRequest);

module.exports = router;
