"use strict";
var express = require('express');
var router = express.Router();
var controller = require('../../../controllers/comment/admin/comment.controller');
// middleware: only signed in user(admin/customer) can access this route
var admin = require('../../../middlewares/admin/admin');
var commentOnRequest = controller.commentOnRequest;
router.post('/:id', admin, commentOnRequest);
module.exports = router;
