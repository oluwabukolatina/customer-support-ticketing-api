"use strict";
var express = require('express');
var router = express.Router();
var controller = require('../../../controllers/comment/customer/comment.controller');
// middleware: only signed in user(admin/customer) can access this route
var auth = require('../../../middlewares/auth');
var commentOnRequest = controller.commentOnRequest;
router.post('/:id', auth, commentOnRequest);
module.exports = router;
