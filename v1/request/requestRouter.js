const express = require('express');

const router = express.Router();

const controller = require('./requestController');

const { createRequest } = controller;
router.post('/request', createRequest);
module.exports = router;
