"use strict";
var express = require('express');
var router = express.Router();
var controller = require('../../../controllers/requests/customers/request.controller');
// middleware: only signed in users can access this route
var auth = require('../../../middlewares/auth');
var createRequest = controller.createRequest, getAUserRequests = controller.getAUserRequests, getARequest = controller.getARequest;
router.post('/', auth, createRequest);
router.get('/', auth, getAUserRequests);
router.get('/:id', auth, getARequest);
module.exports = router;
