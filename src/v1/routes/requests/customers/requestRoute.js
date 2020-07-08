const express = require('express');

const router = express.Router();

const controller = require('../../../controllers/requests/customers/requestController');

// middleware: only signed in users can access this route
const auth = require('../../../middlewares/auth');

const { createRequest, getAUserRequests, getARequest } = controller;
router.post('/', auth, createRequest);
router.get('/user', auth, getAUserRequests);

// any one can view this resource
router.get('/:id', auth, getARequest);

module.exports = router;
