const express = require('express');

const router = express.Router();

const controller = require('../controllers/request');

const { makeRequest } = controller;
router.post('/request', makeRequest);
module.exports = router;
