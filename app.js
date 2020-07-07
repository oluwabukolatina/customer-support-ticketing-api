const express = require('express');

const app = express();
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const request = require('./v1/routes/request');

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/v1/fliqpay', request);

module.exports = app;
