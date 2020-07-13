"use strict";
var express = require('express');
var router = express.Router();
var controller = require('../../../controllers/requests/admin/request.controller');
// middleware: only signed in admin can access this route
var admin = require('../../../middlewares/admin/admin');
var getAllRequests = controller.getAllRequests, getARequest = controller.getARequest, attendToRequest = controller.attendToRequest, searchForClosedRequestsInOneMonth = controller.searchForClosedRequestsInOneMonth;
router.get('/', admin, getAllRequests);
router.get('/searchForClosed', admin, searchForClosedRequestsInOneMonth);
router.get('/:id', admin, getARequest);
router.put('/:id', admin, attendToRequest);
module.exports = router;
