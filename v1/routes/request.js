const express = require('express');

const router = express.Router();

const controller = require('../controllers/request');

const { createRequest } = controller;
router.post('/request', createRequest);
module.exports = router;
