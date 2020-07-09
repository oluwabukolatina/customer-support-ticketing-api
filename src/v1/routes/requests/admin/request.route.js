const express = require('express');

const router = express.Router();

const controller = require('../../../controllers/requests/admin/request.controller');

// middleware: only signed in admin can access this route
const admin = require('../../../middlewares/admin/admin');
const auth = require('../../../middlewares/auth');

const {
  getAllRequests, getARequest, attendToRequest, searchForClosedRequestsInOneMonth,
} = controller;
router.get('/', admin, getAllRequests);
router.get('/searchForClosed', admin, searchForClosedRequestsInOneMonth);
router.get('/:id', auth, getARequest);
router.put('/:id', admin, attendToRequest);

module.exports = router;
