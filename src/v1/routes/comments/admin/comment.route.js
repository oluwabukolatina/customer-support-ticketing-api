const express = require('express');

const router = express.Router();

const controller = require('../../../controllers/comment/admin/comment.controller');

// middleware: only signed in user(admin/customer) can access this route
const admin = require('../../../middlewares/admin/admin');

const { commentOnRequest } = controller;
router.post('/:id', admin, commentOnRequest);

module.exports = router;
