const express = require('express');

const router = express.Router();

const controller = require('../../../controllers/requests/admin/request.controller');

// middleware: only signed in admin can access this route
const admin = require('../../../middlewares/admin/admin');

const { getAllRequests, getARequest, closeRequest } = controller;
router.get('/', admin, getAllRequests);
router.get('/:id', admin, getARequest);
router.put('/:id', admin, closeRequest);

module.exports = router;
