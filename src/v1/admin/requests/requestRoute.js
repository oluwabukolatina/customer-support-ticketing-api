const express = require('express');

const router = express.Router();

const controller = require('./requestController');

// middleware: only signed in users can access this route
const auth = require('../../middlewares/auth');
const admin = require('../../middlewares/admin/admin');

const { getAllRequests, getARequest, resolveRequest } = controller;
router.get('/', auth, getAllRequests);
router.get('/:id', admin, getARequest);
router.put('/:id', admin, resolveRequest);

module.exports = router;
